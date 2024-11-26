const Payment = require("../models/payment.model.js");
const imageFolder = process.env.APP_IMAGE_URL + "payment/"

var response;
exports.getAllType = (req, res) => {

    Payment.getAllType((err, data) => {
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

exports.findByType = (req, res) => {

    const payment_type_id = req.query.payment_type_id;

    let params = [];
    params['payment_type_id'] = payment_type_id;

    Payment.findByType(params, (err, data) => {
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
        var result_data = [];

        if (data.length > 0)
        {
          for (i=0; i<data.length; i++) 
          {
            var item = data[i];
            let result_item = {
                payment_id: data[i].payment_detail_id,
                payment_name: data[i].payment_detail_name,
                payment_image: imageFolder + data[i].payment_detail_image,
              };
  
            result_data.push(result_item);
          }
        }
  
        response = {
          status: 200,
          data: result_data,
          count: data.length
        }
  
        return res.send(response);
      }
    });
  };