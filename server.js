#!/usr/bin/env nodejs

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const request = require('request')
const app = express()
const PORT = process.env.PORT || 8443


// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(urlencodedParser);
app.use(jsonParser);
app.use(express.static(__dirname + "/app/build/"));

app.get('/data', function (req, res) {
  request('https://www.forbes.com/ajax/list/data?year=2018&uri=billionaires&type=person', function(error, response, body) {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body)
    res.send(data)
  });
});

const server = app.listen(PORT, () => console.log(`App Running On PORT *${PORT}`));

module.exports = { app, server }
