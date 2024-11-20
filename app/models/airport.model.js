const sql = require("./db.js");

// constructor
const Airport = function(airport) {

};

Airport.getAll = result => {
  sql.query("SELECT * FROM airport", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("airports: ", res);
    result(null, res);
  });
};

module.exports = Airport;
