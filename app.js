//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

const date = require(__dirname + "/date.js");
const urgent = [],
  necessary = [],
  extra = [],
  notes = [],
  order = [];

app.get("/", function(req, res) {
  res.redirect("/preplist");
})

app.get("/preplist", function(req, res) {
  let day = date.getDate();

  res.render("preplist", {
    listTitle: day,
    newUrgent: urgent,
    newNecessary: necessary,
    newExtra: extra,
    newNotes: notes,
    newOrder: order
  });
});

app.post("/preplist", function(req, res) {
  const addItem = function(list, newItem) {
    if (newItem !== undefined) {
      list.push(newItem);
    }
  };

  addItem(urgent, req.body.newItemUrgent);
  addItem(necessary, req.body.newItemNecessary);
  addItem(extra, req.body.newItemExtra);
  addItem(notes, req.body.newItemNotes);
  addItem(order, req.body.newItemOrder);



  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started at port 3000.");
});
