const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const locationRouter = require("./routes/location");

// app.set("view engine", "ejs");
// app.set("views", "views");

app.use(bodyParser.json());

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST, GET", "OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(locationRouter);

// app.use((request, response, next) => {
//   response.setHeader("Content-Type", "text/html");
//   next();
// });

// app.use((request, response, next) => {
//   const userName = request.body.username || "Unknown User";
//   response.render("index", {
//     user: userName
//   });
// });

app.listen(3000);
