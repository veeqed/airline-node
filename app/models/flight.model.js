const sql = require("./db.js");

// constructor
const Flight = function(flight) {

};

Flight.findByParams = (params, result) => {
    let query = `SELECT flight_schedule_id, DATE_FORMAT(fl.flight_date,'%d/%m/%Y') as flight_date_format, fl.price, ro.from_airport_code, ro.to_airport_code, TIME_FORMAT(ro.depart_time, "%H:%i") as depart_time, TIME_FORMAT(ro.arrival_time, "%H:%i") as arrival_time, ro.isAcrossDay FROM flight_schedule fl JOIN route ro ON fl.route_id = ro.route_id`

    let where = ""
    let params_array = []
    let order_by = " ORDER BY fl.price ASC "

    if (params['airport_from'] && params['airport_from'] != "")
    {
        where += ` WHERE ro.from_airport_code = ? `;
        params_array.push(`${params['airport_from']}`);
    }

    if (params['airport_to'] && params['airport_to'] != "")
    {
        if (where == "")
        {
            where += ` WHERE `;
        }
        else
        {
            where += ` AND `;
        }

        where += ` ro.to_airport_code = ? `;
        params_array.push(`${params['airport_to']}`);
    }

    if (params['flight_date'] && params['flight_date'] != "")
    {
        if (where == "")
        {
            where += ` WHERE `;
        }
        else
        {
            where += ` AND `;
        }

        where += ` DATE_FORMAT(fl.flight_date,'%d/%m/%Y') = ? `;
        params_array.push(params['flight_date']);
    }

    if (params['sort'] && params['sort'] != "")
    {
        switch(params['sort']) {
            case 'price' : 
                order_by = " ORDER BY price ASC "
            break;
            case 'date_asc' : 
                order_by = " ORDER BY ro.depart_time ASC "
            break;
            case 'date_desc' : 
                order_by = " ORDER BY ro.depart_time DESC "
            break;
        }
    }

    query = query + where + order_by;

    //console.log(query)

    sql.query(query, params_array, (err, res) => {

    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    //console.log("flights: ", res);
    result(null, res);
  });
};

Flight.findSeat = (params, result) => {
    let query = `SELECT seat_code, seat_type FROM master_seat WHERE airplane_id = 1 `

    let where = ""
    let params_array = []
    let order_by = " ORDER BY seat_code ASC "

    if (params['airplane_id'] && params['airplane_id'] != "")
    {
        where += ` WHERE airplane_id = ? `;
        params_array.push(`${params['airplane_id']}`);
    }

    query = query + where + order_by;

    sql.query(query, params_array, (err, res) => {

    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    result(null, res);
  });
};

Flight.getSeatPrice = (result) => {
    let query = `SELECT seat_type, seat_price FROM seat_price `

    sql.query(query, (err, res) => {

    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    result(null, res);
  });
};

module.exports = Flight;
