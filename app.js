const express = require("express");
const expressOasGenerator = require("express-oas-generator");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const fs = require("fs");
const mkdirp = require("mkdirp");
const axios = require("axios");
const socketio = require("socket.io");

/**
 * -------------- GENERAL SETUP ----------------
 */

require("dotenv").config();

var app = express();

// Handle the responses
// if (process.env.NODE_ENV !== "production") {
//   const openAPIFilePath = "./documentation/api.json";

//   mkdirp.sync(path.parse(openAPIFilePath).dir);

//   let predefinedSpec;

//   try {
//     predefinedSpec = JSON.parse(
//       fs.readFileSync(openAPIFilePath, { encoding: "utf-8" })
//     );
//   } catch (e) {
//     console.log(e);
//   }

//   expressOasGenerator.handleResponses(app, {
//     specOutputPath: openAPIFilePath,
//     writeIntervalMs: 0,
//     predefinedSpec: predefinedSpec ? () => predefinedSpec : undefined,
//   });
// }

// Configuring the database and opening a global connection
require("./config/database");

// loading the models
require("./models/user");
require("./models/Post");
require("./models/Class");
require("./models/ClassEnrollment");
require("./models/Comment");
require("./models/Notifications");
require("./models/Vote");

// Passing the global passport object into the configuration function
require("./config/passport")(passport);

// Initialize the passport object on every request
app.use(passport.initialize());

// Replace of body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

/**
 * -------------- ROUTES ----------------
 */
// Imports all of the routes from ./routes/index.js
app.use(require("./routes"));

// OAS
// expressOasGenerator.handleRequests();

// Save all classes from roster for every subject into DB
const mongoose = require("mongoose");
const Class = mongoose.model("Class");

Class.countDocuments(async function (err, count) {
  if (!err && count === 0) {
    const subjectsResponse = await axios(
      "https://classes.cornell.edu/api/2.0/config/subjects.json?roster=FA20"
    );

    const subjects = subjectsResponse.data.data.subjects;

    for (const subject of subjects) {
      console.log(subject);
      const response = await axios(
        `https://classes.cornell.edu/api/2.0/search/classes.json?roster=FA20&subject=${subject.value}`
      );

      const classes = response.data.data.classes.map(
        ({
          titleShort,
          catalogNbr,
          crseId,
          description,
          subject,
          titleLong,
        }) => {
          return {
            catalogNbr: catalogNbr,
            subject: subject,
            titleShort: titleShort,
            description: description,
            term: "FA20",
            crseId: crseId,
            titleLong: titleLong,
            completeTitle: `${subject} ${catalogNbr} ${titleLong}`,
          };
        }
      );
      await Class.create(classes);
    }
  }
}).then(() => {
  console.log("done");

  /**
   * Serve react app
   */
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("/*", function (req, res) {
      res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
  }

  /**
   * -------------- SERVER ----------------
   */

  const server = app.listen(process.env.PORT || 3000);

  /**
   * -------------- WEB SOCKET ----------------
   */

  // const io = socketio.listen(server);

  // io.sockets.on("connection", function (socket) {
  //   socket.on("join", (data) => {
  //     console.log(data);
  //   });
  //   socket.on("disconnect", () => {
  //     console.log("gone");
  //   });
  // });
});
