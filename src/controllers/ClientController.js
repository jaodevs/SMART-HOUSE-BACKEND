const Client = require("../models/Client");

module.exports = {
  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;
    try {
      const clients = await Client.findAndCountAll({
        offset: (page - 1) * limit,
        limit: parseInt(limit),
      });
      const totalPages = Math.ceil(clients.count / limit);
      return res.json({
        clients: clients.rows,
        totalPages,
      });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },
  async store(req, res) {
    const { name, email, password } = req.body;

    const newClient = await Client.create({ name, email, password });

    return res.json(newClient);
  },

  async findById(req, res) {
    const { id } = req.params;

    try {
      const client = await Client.findByPk(id);

      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      return res.json(client);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const client = await Client.findByPk(id);

      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      await client.destroy();

      return res.json({ message: "Client deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
      const client = await Client.findByPk(id);

      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      await client.update({ name, email, password });

      return res.json(client);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },
};
