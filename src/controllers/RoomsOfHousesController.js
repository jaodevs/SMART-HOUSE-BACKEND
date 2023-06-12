const RoomsOfHouses = require("../models/rooms_of_houses");

module.exports = {
  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;
    try {
      const rooms = await RoomsOfHouses.findAndCountAll({
        offset: (page - 1) * limit,
        limit: parseInt(limit),
      });
      const totalPages = Math.ceil(rooms.count / limit);
      return res.json({
        rooms: rooms.rows,
        totalPages,
      });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },

  async store(req, res) {
    const { name } = req.body;

    const newRoom = await RoomsOfHouses.create({ name });

    return res.json(newRoom);
  },

  async findById(req, res) {
    const { id } = req.params;

    try {
      const room = await RoomsOfHouses.findByPk(id);

      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      return res.json(room);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const room = await RoomsOfHouses.findByPk(id);

      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      await room.destroy();

      return res.json({ message: "Room deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const room = await RoomsOfHouses.findByPk(id);

      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      await room.update({ name });

      return res.json(room);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },
};
