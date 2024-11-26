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

        return res.send(response);
      }
      else
      {
        response = {
            status: 200,
            data: data,
            count: data.length
        }
    
        return res.send(response);
      }
    });
};