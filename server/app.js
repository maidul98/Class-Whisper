const express = require('express');
const expressOasGenerator = require('express-oas-generator');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const fs = require('fs')
const mkdirp = require('mkdirp')

/**
 * -------------- GENERAL SETUP ----------------
 */

require('dotenv').config();

var app = express();

// Handle the responses
if (process.env.NODE_ENV !== 'production') {
  const openAPIFilePath = './documentation/api.json'

  mkdirp.sync(path.parse(openAPIFilePath).dir);

  let predefinedSpec;

  try {
    predefinedSpec = JSON.parse(
      fs.readFileSync(openAPIFilePath, { encoding: 'utf-8' })
    );
  } catch (e) {
    console.log(e)
  }

  expressOasGenerator.handleResponses(app, {
    specOutputPath: openAPIFilePath,
    writeIntervalMs: 0,
   predefinedSpec: predefinedSpec ? () => predefinedSpec : undefined,
  });
}


// Configuring the database and opening a global connection 
require('./config/database');

// loading the models
require('./models/user');
require('./models/Post');

// Passing the global passport object into the configuration function
require('./config/passport')(passport);

// Initialize the passport object on every request
app.use(passport.initialize());

// Replace of body-parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());


/**
 * -------------- ROUTES ----------------
 */
// Imports all of the routes from ./routes/index.js
app.use(require('./routes'));


// OAS
expressOasGenerator.handleRequests();

/**
 * -------------- SERVER ----------------
 */
app.listen(3000);
