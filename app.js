const express = require("express");
const todoController = require('./controller/todoController')

const app = express();

//setup tamplate engine
app.set("view engine", "ejs");

//static files
app.use(express.static("./public"));

//Fire Controller 
todoController(app)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
