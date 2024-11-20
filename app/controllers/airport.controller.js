const Airport = require("../models/airport.model.js");

var response;
exports.findAll = (req, res) => {

    Airport.getAll((err, data) => {
      if (err)
      {
        response = {
            status: 400,
            messages: err.messages
        }

        res.send(response);
      }
      else
      {
        response = {
            status: 200,
            data: data
        }
    
        return res.send(response);
      }
    });
};