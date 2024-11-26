const verifyToken = require("../middleware/verifyToken.js");

module.exports = app => {
    const payments = require("../controllers/payment.controller.js");
  
    const router = require("express").Router();

    router.get('/payment_types', verifyToken, function(req, res, next) {
        payments.getAllType(req, res);
    });

    router.get('/payment_details', verifyToken, function(req, res, next) {
        payments.findByType(req, res);
    });

    return router;
};