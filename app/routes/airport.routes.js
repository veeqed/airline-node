module.exports = app => {
    const airports = require("../controllers/airport.controller.js");
  
    const router = require("express").Router();

    // Retrieve all Tutorials
    router.get("/airports", airports.findAll);

    return router;
};