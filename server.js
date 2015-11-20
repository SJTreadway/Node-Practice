var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var stuff = require('node-day-one');
var app = express();
var resources = stuff.resources;

var guestList = {};


app.use(function(req, res, next) {
  console.log('${req.method} at ${req.url}');
  next();
});

app.post('*', function(req, res, next) {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).json('Expected content-type application/json');
  }
  else {
    next();
  }
})

app.use(bodyParser.json());
app.use(cors());

app.get('/resources', function(req, res) {
    console.log('GETTING AT RESOURCES');
    res.json(resources)
});

app.get('/guest-list', function(req, res) {
  res.json(guestList);
});

app.post('/guest-list', function(req, res) {
  var guests = req.body;
  // {guestName: true}
  for (var key in guests) {
    guestList[key] = guests[key];
  }
  res.json(true);
});

app.get('/greeting', function(req, res) {
  if (req.query.language === 'es') {
    return res.json('Hola!');
  }
  else {
    return res.json('Hello!');
  }
})

app.put('/guest-list/:guestName', function(req, res) {
  var guestName = req.params.guestName;
  // {attending: true}
  guestList[guestName] = req.body.attending;
  res.json(true);
});

app.listen(9001, function(e) {
    if(e) return console.error(e);
    console.log('Now listening on port:', 9001);
});
