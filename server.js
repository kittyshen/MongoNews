var express = require("express");
var bodyParser = require("body-parser");
// var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 8080;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
// app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//handlebar rendering
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoHeadlines");

// Routes

// A GET route for scraping the echoJS website
app.get("/",function(req,res){
  db.Article.find({})
  .then(function(dbArticle){
    // res.json(dbArticle);
    res.render("index",{article:dbArticle});
  })
})

app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  // axios.get("http://www.echojs.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
  request("https://www.nytimes.com/section/technology?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page", function(error, response, html) {
 
    var $ = cheerio.load(html);

    // Now, we grab every h2 within an article tag, and do the following:
    $("div.story-meta").each(function(i, element) {
      // Save an empty result object
      var result = {};
      console.log("Crappe : sdajhdkhskdj",$(this).parent("a").children("div.wide-thumb"));//.attr("src")
      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("h2.headline")
        .text();
      result.summary = $(this)
        .children("p.summary")
        .text();
      result.link = $(this)
        .parent("a")
        .attr("href");
      // result.imglink = $(this)
      //   .parent("a")
      //   .children("div.wide-thumb")
      //   // .next("div.wide-thumb")
      //   .attr("src");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
  });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find({})  
  .populate("note")
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
  // TODO
  // ====
  // Finish the route so it finds one article using the req.params.id,
  // and run the populate method with "note",
  // then responds with the article with the note included
  var id = req.params.id;
  db.Article.find( {_id:id})   //  db.Article.findOne(_id: id)
  .populate("note")
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  // TODO
  // ====
  // save the new note that gets posted to the Notes collection
  //creating new note
  db.Note.create(req.body)
  .then(function(dbNote) {
    // View the added result in the console
    console.log(dbNote._id);
    return dbNote._id;
  })
  .then(function(data){
    var id = req.params.id;
    console.log(data);  //data contain the new note's id
    return db.Article.findOneAndUpdate({_id:id},{$set:{note:data}})
    // .then(function(dbArticle) {
    //   res.json(dbArticle);
    // })
  })
  .catch(function(err) {
    // If an error occurred, send it to the client
    return res.json(err);
  });

  // save to article
  // then find an article from the req.params.id
  // and update it's "note" property with the _id of the new note
  

});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
