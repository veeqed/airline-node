const Airport = require("../models/airport.model.js");

exports.findAll = (req, res) => {

    Airport.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving"
        });
      else res.send(data);
    });
};