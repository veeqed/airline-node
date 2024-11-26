const sql = require("./db.js");

// constructor
const Payment = function(payment) {

};

Payment.getAllType = result => {
  sql.query("SELECT * FROM payment_type", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("payments: ", res);
    result(null, res);
    return;
  });
};

Payment.findByType = (params, result) => {
    let query = `SELECT * FROM payment_detail `

    let where = ""
    let params_array = []
    let order_by = " ORDER BY payment_detail_id ASC "

    if (params['payment_type_id'] && params['payment_type_id'] != "")
    {
        where += ` WHERE payment_type_id = ? `;
        params_array.push(`${params['payment_type_id']}`);
    }

    query = query + where + order_by;

    console.log(query, params_array);

    sql.query(query, params_array, (err, res) => {

    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    result(null, res);
  });
};

module.exports = Payment;
