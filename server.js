const express = require("express");
var mongojs = require("mongojs");
const mongoose = require("mongoose");
const routes = require("./routes");
var axios = require("axios");
var cheerio = require("cheerio");
const app = express();
const PORT = process.env.PORT || 3001;


// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/scrape", function(req,res){
  axios.get("https://www.nytimes.com/topic/subject/finances")
  .then(function(response){
    var $ = cheerio.load(response.data);
    console.log(res);
    console.log(response);
  })
  res.send("Scrape Complete")
})

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/fauxfinancedata"
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
