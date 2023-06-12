const Sensors = require("../models/Sensors");

module.exports = {
  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;
    try {
      const sensors = await Sensors.findAndCountAll({
        offset: (page - 1) * limit,
        limit: parseInt(limit),
      });
      const totalPages = Math.ceil(sensors.count / limit);
      return res.json({
        sensors: sensors.rows,
        totalPages,
      });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },
  async store(req, res) {
    const { name, value } = req.body;

    const newSensor = await Sensors.create({ name, value });

    return res.json(newSensor);
  },

  async findById(req, res) {
    const { id } = req.params;

    try {
      const sensor = await Sensors.findByPk(id);

      if (!sensor) {
        return res.status(404).json({ error: "Sensor not found" });
      }

      return res.json(sensor);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const sensor = await Sensors.findByPk(id);

      if (!sensor) {
        return res.status(404).json({ error: "Sensor not found" });
      }

      await sensor.destroy();

      return res.json({ message: "Sensor deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, value } = req.body;

    try {
      const sensor = await Sensors.findByPk(id);

      if (!sensor) {
        return res.status(404).json({ error: "Sensor not found" });
      }

      await sensor.update({ name, value });

      return res.json(sensor);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  },
};
