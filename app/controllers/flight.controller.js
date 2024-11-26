
const Flight = require("../models/flight.model.js");
const moment = require('moment');

var response;
exports.findByParams = (req, res) => {

  const airport_from = req.query.airport_from;
  const airport_to = req.query.airport_to;
  const flight_date = req.query.flight_date;
  const sort = req.query.sort;

  let params = [];
  params['airport_from'] = airport_from;
  params['airport_to'] = airport_to;
  params['flight_date'] = flight_date;
  params['sort'] = sort;

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
        var result_data = [];

        if (data.length > 0)
        {
          for (i=0; i<data.length; i++) 
          {
            
            var item = data[i];
            var depart_date, arrival_date;
            
            if (item.isAcrossDay == 0) 
            {
              depart_date = flight_date + " " + item.depart_time;
              arrival_date = flight_date + " " + item.arrival_time;
            }
            else //flight ข้ามวัน
            {
              let date_array = flight_date.split("/");
              let day = date_array[0];
              let month = date_array[1];
              let year = date_array[2];
              let start_date = `${year}-${month}-${day}`;

              let date = moment(start_date).format('YYYY-MM-DD');
              let tomorrow = moment(date).add(1, 'days').format('DD/MM/YYYY');

              arrival_date = tomorrow + " " + item.arrival_time;
              depart_date = flight_date + " " + item.depart_time;
            }

            let result_item = {
              flight_id: data[i].flight_schedule_id,
              flight_date_format: data[i].flight_date_format,
              price: data[i].price,
              from_airport_code: data[i].from_airport_code,
              to_airport_code: data[i].to_airport_code,
              depart_time: data[i].depart_time,
              arrival_time: data[i].arrival_time,
              depart_date: depart_date,
              arrival_date: arrival_date,
            };

            result_data.push(result_item);
          }
        }

        response = {
            status: 200,
            data: result_data,
            count: data.length
        }

        res.send(response);
      }
    });
};

exports.findSeat = (req, res) => {

  const airport_id = req.query.airport_id;
  let params = [];
  params['airport_id'] = airport_id;

  Flight.findSeat(params, (err, data) => {
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

exports.getSeatPrice = (req, res) => {

  Flight.getSeatPrice((err, data) => {
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
