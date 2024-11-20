module.exports = app => {
    const promotionHome = require("../controllers/promotionHome.controller.js");
  
    const router = require("express").Router();

    // Retrieve all Tutorials
    router.get("/promotion_homes", promotionHome.findAll);

    return router;
};