const express = require("express");

const clientController = require("./controllers/ClientController");
const immobileController = require("./controllers/ImmobileController");
const rooms_of_houses = require("./controllers/RoomsOfHousesController");
const sensors = require("./controllers/SensorsController");

const routes = express.Router();

/* CLient */
routes.get("/clients", clientController.index);
routes.post("/clients", clientController.store);
routes.get("/clients/:id", clientController.findById);
routes.delete("/clients/:id", clientController.delete);
routes.put("/clients/:id", clientController.update);

/* Immobile */
routes.get("/immobiles", immobileController.index);
routes.post("/immobiles", immobileController.store);
routes.get("/immobiles/:id", immobileController.findById);
routes.put("/immobiles/:id", immobileController.update);

/* rooms_of_houses */
routes.get("/rooms_of_houses", rooms_of_houses.index);
routes.post("/rooms_of_houses", rooms_of_houses.store);
routes.get("/rooms_of_houses/:id", rooms_of_houses.findById);
routes.delete("/rooms_of_houses/:id", rooms_of_houses.delete);
routes.put("/rooms_of_houses/:id", rooms_of_houses.update);

/* sensors */
routes.get("/sensors", sensors.index);
routes.post("/sensors", sensors.store);
routes.get("/sensors/:id", sensors.findById);
routes.delete("/sensors/:id", sensors.delete);
routes.put("/sensors/:id", sensors.update);

module.exports = routes;
