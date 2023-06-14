const RoomsOfHouses = require("../models/rooms_of_houses");
const Sensors = require("../models/Sensors");

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
    const { name, immobile_id } = req.body;

    try {
      const newRoom = await RoomsOfHouses.create({ name, immobile_id });

      return res.json(newRoom);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
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

      const hasRelatedSensors = await Sensors.count({ where: { roomId: id } });

      if (hasRelatedSensors > 0) {
        await Sensors.destroy({ where: { roomId: id } });
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
