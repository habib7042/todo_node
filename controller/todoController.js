const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//connect to Database
mongoose.connect(
  "mongodb+srv://habib96:habib96@cluster0.zqrrn.mongodb.net/todo?retryWrites=true&w=majority"
);

//Create a schema
const todoSchema = new mongoose.Schema({
  item: String,
});
const Todo = mongoose.model("Todo", todoSchema);

// var data = [
//   { item: "get milk" },
//   { item: "walk for 5 min" },
//   { item: "coding for 1 h" },
// ];
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  app.get("/todo", function (req, res) {
    //Get data from mongodb
    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render("todo", { todo: data });
    });
  });
  app.post("/todo", urlencodedParser, function (req, res) {
    //post data to mongodb
    var newTodoItem = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
  app.delete("/todo/:item", function (req, res) {
    //Delete items from mongodb
    Todo.find({ item: req.params.item.replace(/\-/g, "") }).deleteMany(
      function (err, data) {
        if (err) throw err;
        res.json(data);
      }
    );
  });
};
