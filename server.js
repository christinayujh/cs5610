// Get the dependencies

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist/my-project')));


// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const port = process.env.PORT || '3200';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);
server.listen( port , () => console.log('Running on port 3200'));


//demo hello world api calls
// app.get("/api/hello", function(req, res){
//   console.log("Get hello api call!");
//   res.send("Hello world!");});

//my api list
// app.get('/api/user/123', findUserById);

// function findUserById (req, res) {
//
//   res.status(200).send("find a user!");
// }


//require('./assignment/app')(app);
//require('./helloworld')(app);

var connectionString = 'mongodb://jiahuanyu123:jiahuanyu123@ds049854.mlab.com:49854/heroku_2s3m3vn6';
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const client = mongoose.connect( connectionString, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require("./assignment/app")(app);


