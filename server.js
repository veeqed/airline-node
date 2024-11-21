const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/images', express.static('public/images'));

const PORT = 3000

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'airline_db'
});

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

const airportRouter = require("./app/routes/airport.routes.js")();
const promotionHomeRouter = require("./app/routes/promotionHome.routes.js")();
const flightRouter = require("./app/routes/flight.routes.js")();

app.use(airportRouter);
app.use(promotionHomeRouter);
app.use(flightRouter);

app.get('*', function (req, res) {
  let response = {
    status: 404,
    messages: "api not found"
  }
  res.send(response)
})

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});