// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// get route for all data 
app.get('/all', sendData);
// function to send all data into client browser 
function sendData(request, response) {
  response.send(projectData);
};

// post route for store data
app.post('/add', postData);
// postData function to add data into project data object and save it
function postData(request, response) {
  projectData = request.body;
  console.log(projectData);
  response.send(projectData);
}

// Setup Server
// server port
const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
// listening function
function listening() {
  // console.log(server);
  console.log(`running on localhost: ${port}`);
};