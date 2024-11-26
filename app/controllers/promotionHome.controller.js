const PromotionHome = require("../models/promotionHome.model.js");

const promotionFolder = process.env.APP_IMAGE_URL + "promotion_home/"

var response;

exports.findAll = (req, res) => {

  PromotionHome.getAll((err, data) => {
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
      let promotion_list = [];

      data.forEach((element) => {

        let promotion_item = {
          card_id: element.promotion_home_id,
          title: element.title,
          description: element.description,
          image_url: promotionFolder + element.image_url,
        }

        promotion_list.push(promotion_item);
      });

      response = {
        status: 200,
        data: promotion_list
      }

      return res.send(response);
    }
  });
};