const sql = require("./db.js");

// constructor
const promotionHome = function(promotion) {

};

promotionHome.getAll = result => {
  sql.query("SELECT * FROM promotion_home WHERE active = 1 ORDER BY show_number", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("promotion_homes: ", res);
    result(null, res);
  });
};

module.exports = promotionHome;
