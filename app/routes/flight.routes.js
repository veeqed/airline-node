const verifyToken = require("../middleware/verifyToken.js");

module.exports = app => {
    const flights = require("../controllers/flight.controller.js");
  
    const router = require("express").Router();

    router.get('/flights', verifyToken, function(req, res, next) {
        flights.findByParams(req, res);
    });

    router.get('/seats', verifyToken, function(req, res, next) {
        flights.findSeat(req, res);
    });

    router.get('/seat_price', verifyToken, function(req, res, next) {
        flights.getSeatPrice(req, res);
    });

    return router;
};