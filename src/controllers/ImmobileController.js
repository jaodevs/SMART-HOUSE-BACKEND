const Immobile = require("../models/Immobile");
const RoomOfHouse = require("../models/rooms_of_houses");
const Sensor = require("../models/Sensors");

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
    const { addresses, numberofrooms, client_id } = req.body;

    try {
      const newImmobile = await Immobile.create({
        addresses,
        numberofrooms,
        client_id,
      });
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
      await Sensor.destroy({ where: { room_Id: id } });

      await RoomOfHouse.destroy({ where: { immobile_id: id } });

      const immobile = await Immobile.findByPk(id);
      if (!immobile) {
        return res.status(404).json({ error: "Immobile not found" });
      }

      await immobile.destroy();

      return res
        .status(200)
        .json({ message: "Immobile and related rooms deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { addresses, numberofrooms } = req.body;

    try {
      const immobile = await Immobile.findByPk(id);

      if (!immobile) {
        return res.status(404).json({ error: "Immobile not found" });
      }

      await immobile.update({ addresses, numberofrooms });

      return res.json(immobile);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },
};
