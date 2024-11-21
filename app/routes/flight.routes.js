module.exports = app => {
    const flights = require("../controllers/flight.controller.js");
  
    const router = require("express").Router();

    // Retrieve all Tutorials
    router.get("/flights", flights.findByParams);

    return router;
};