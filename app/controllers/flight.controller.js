const Flight = require("../models/flight.model.js");


var response;
exports.findByParams = (req, res) => {

  const airport_from = req.query.airport_from;
  const airport_to = req.query.airport_to;
  const depart_date = req.query.depart_date;
  const return_date = req.query.return_date;

  let params = [];
  params['airport_from'] = airport_from;
  params['airport_to'] = airport_to;
  params['depart_date'] = depart_date;
  params['return_date'] = return_date;

  Flight.findByParams(params, (err, data) => {
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