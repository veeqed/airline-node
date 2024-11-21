const sql = require("./db.js");

// constructor
const Flight = function(flight) {

};

Flight.findByParams = (params, result) => {
    let query = `SELECT DATE_FORMAT(fl.departure,'%d/%m/%Y') as departure,DATE_FORMAT(fl.arrival,'%d/%m/%Y') as arrival, 
price, route_code, aif.airport_name as airport_name_from, ait.airport_name as airport_name_to 
FROM flight_schedule fl
JOIN route ro ON fl.route_id = ro.route_id 
JOIN airport aif ON ro.from_airport_id = aif.airport_id 
JOIN airport ait ON ro.to_airport_id = ait.airport_id `

    let where = ""
    let params_array = []
    let order_by = " ORDER BY price ASC "

    if (params['airport_from'] && params['airport_from'] != "")
    {
        where += ` WHERE aif.airport_name LIKE ? `;
        params_array.push(`%${params['airport_from']}%`);
    }

    if (params['airport_to'] && params['airport_to'] != "")
    {
        if (where == "")
            where += ` WHERE `;

        where += ` ait.aiport_name LIKE ? `;
        params_array.push(`%${params['airport_to']}%`);
    }

    if (params['depart_date'] && params['depart_date'] != "")
    {
        if (where == "")
            where += ` WHERE `;

        where += ` DATE_FORMAT(fl.departure,'%d/%m/%Y') = ? `;
        params_array.push(params['depart_date']);
    }

    query = query + where + order_by;

    console.log(params_array)

    sql.query(query, [params_array], (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    //console.log("flights: ", res);
    result(null, res);
  });
};

module.exports = Flight;
