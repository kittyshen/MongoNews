# MongoNews
UC Berkeley coding assignment 14

### Overview

In this assignment, you'll create a web app that lets users view and leave comments on the latest news. But you're not going to actually write any articles; instead, you'll flex your Mongoose and Cheerio muscles to scrape news from another site.

### Technologe used
1. express
2. express-handlebars
3. mongoose
4. body-parser
5. cheerio
6. request



10. In order to deploy your project to Heroku, you must set up an mLab provision. mLab is remote MongoDB database that Heroku supports natively. Follow these steps to get it running:

11. Create a Heroku app in your project directory.

12. Run this command in your Terminal/Bash window:

    * `heroku addons:create mongolab`

    * This command will add the free mLab provision to your project.

13. When you go to connect your mongo database to mongoose, do so the following way:

```js
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
```

* This code should connect mongoose to your remote mongolab database if deployed, but otherwise will connect to the local mongoHeadlines database on your computer.

14. [Watch this demo of a possible submission](mongo-homework-demo.mov). See the deployed demo application [here](http://nyt-mongo-scraper.herokuapp.com/).

15. Your site doesn't need to match the demo's style, but feel free to attempt something similar if you'd like. Otherwise, just be creative!

## Instructions

* Create an app that accomplishes the following:

  1. Whenever a user visits your site, the app should scrape stories from a news outlet of your choice and display them for the user. Each scraped article should be saved to your application database. At a minimum, the app should scrape and display the following information for each article:

     * Headline - the title of the article

     * Summary - a short summary of the article

     * URL - the url to the original article

     * Feel free to add more content to your database (photos, bylines, and so on).

  2. Users should also be able to leave comments on the articles displayed and revisit them later. The comments should be saved to the database as well and associated with their articles. Users should also be able to delete comments left on articles. All stored comments should be visible to every user.


### Tips

* Whenever you scrape a site for stories, make sure an article isn't already represented in your database before saving it; we don't want duplicates.

* Don't just clear out your database and populate it with scraped articles whenever a user accesses your site.

  * If your app deletes stories every time someone visits, your users won't be able to see any comments except the ones that they post.

### Helpful Links

* [MongoDB Documentation](https://docs.mongodb.com/manual/)
* [Mongoose Documentation](http://mongoosejs.com/docs/api.html)
* [Cheerio Documentation](https://github.com/cheeriojs/cheerio)

## learning points

```js
// mongo db CRUD insert read update delete quick reference
db.zoo.insert({name:"cat", numlegs:"4", class:"mammal", weight:10})
db.zoo.insert({name:"dog", numlegs:"4", class:"mammal", weight:20})
//  How to sort by id:
db.zoo.find().sort({_id:1})
// Update one key value pair
db.places.update({"country": "Morocco"}, {$set: {"capital":"RABAT"}})
// How to push to an array with $push
db.places.update({"country": "Morocco"}, {$push: {"majorcities":"Agadir"}})
// How to delete an entry with db.[COLLECTION_NAME].remove()
db.places.remove({"country":"Morocco"})
// How to empty a collection with db.[COLLECTION_NAME].remove()
db.places.remove({})
// How to drop a collection with db.[COLLECTION_NAME].drop()
db.places.drop()
// How to drop a database
db.dropDatabase()
```

```js
git remote rm heroku
heroku create
git remote -v
heroku addons:create mongolab
heroku config:get MONGODB_URI
heroku logs -t
```

## Link to the site
[https://kitty-mongonews.herokuapp.com/](https://kitty-mongonews.herokuapp.com/)

## Author 
[Kitty Shen ](https://github.com/kittyshen)

https://github.com/kittyshen

### [Link to Portfolio Site](https://kittyshen.github.io/Portfolio/)

## License
Standard MIT License
