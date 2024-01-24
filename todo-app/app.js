/* eslint-disable semi */
/* eslint-disable quotes */
var csrf = require("csrf");
const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const path = require("path");
const { title } = require("process");
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser("shh! some secret string"));
app.use(csrf({ cookie:true}))


app.set("view engine", "ejs");
  app.get("/", async (request, response) => {
      const overdue = await Todo.getOverdueTodos;
      const duetoday = await Todo.getDueTodayTodos;
      const duelater = await Todo.getDueLaterTodos;
  
      if (request.accepts("html")) {
           response.render("index",{
        title: "Todo application", 
          overdue,
          duetoday,
          duelater,
        });
      }
  else {
    response.json({
      overdue,
      duetoday,
      duelater,
    })
  }
});
app.use(express.static(path.join(__dirname,'public')));

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  try {
    await Todo.findAll();
    return response.send(todos);
  } catch (err) {
    console.log(err);
    return response.status(422).json(err);
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async (request, response) => {
  console.log("Creating a todo",request.body);
  try {
    const todo = await Todo.addTodo({
      title:request.body.title,
      dueDate: request.body.dueDate,
    });
    return response.redirect("/");
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});
//app.js
app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo).status(200);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async (request, response) => {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  
  try {
 
     await Todo.remove(request.params.id);
      return response.json({success: true});
    }
  catch (error) {
    return response.status(422).json(error);
  }

});

module.exports = app;
