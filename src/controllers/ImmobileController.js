const Immobile = require("../models/Immobile");

module.exports = {
  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;
    try {
      const immobile = await Immobile.findAndCountAll({
        offset: (page - 1) * limit,
        limit: parseInt(limit),
      });
      const totalPages = Math.ceil(immobile.count / limit);
      return res.json({
        immobile: immobile.rows,
        totalPages,
      });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },

  async store(req, res) {
    const { Addresses, numberOfRooms } = req.body;

    try {
      const newImmobile = await Immobile.create({ Addresses, numberOfRooms });
      return res.json(newImmobile);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },

  async findById(req, res) {
    const { id } = req.params;

    try {
      const immobile = await Immobile.findByPk(id);

      if (!immobile) {
        return res.status(404).json({ error: "Immobile not found" });
      }

      return res.json(immobile);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const immobile = await Immobile.findByPk(id);

      if (!immobile) {
        return res.status(404).json({ error: "Immobile not found" });
      }

      await immobile.destroy();

      return res.json({ message: "Immobile deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { Addresses, numberOfRooms } = req.body;

    try {
      const immobile = await Immobile.findByPk(id);

      if (!immobile) {
        return res.status(404).json({ error: "Immobile not found" });
      }

      await immobile.update({ Addresses, numberOfRooms });

      return res.json(immobile);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },
};
