const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const passport = require('passport')
const indexRoutes = require("./routes/index")
const authRoutes = require("./routes/authRoutes")
const stockRoutes = require("./routes/stockRoutes")

const app = express();
const PORT = process.env.PORT || 3001;

// Passport Config
require('./config/passport')(passport);

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
  console.log("Database Error:", error);
});

// Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.bodyParser())


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//scrape nyt for articles
app.get('/api/scrape/', (req, res) => {
  
  axios.get("https://www.nytimes.com/topic/subject/finances").then(function (result) {
    var $ = cheerio.load(result.data);
    var titleObjArr = [];
    $(".css-ye6x8s").each(function () {
      var titleObj = {
        title: $(this).children().children().children().children("h2").text(),
        link: $(this).children().children().children("a").attr("href")
      }
      titleObjArr.push(titleObj);
    });
    res.json(titleObjArr);
  });
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Route links
// app.use("/",indexRoutes)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build'), function (err) {
      if (err) res.status(500).send(err)
  })
})
app.use("/auth", authRoutes);
app.use("/stocks", stockRoutes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/fauxfinancedata" , { useNewUrlParser: true , useUnifiedTopology: true}
);

// Start the API server
app.listen(PORT, function() {
  console.log(`Hosting on http://localhost:${PORT}/`);
});