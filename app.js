 /* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/",async (request,response) => {
  const overdue = await Todo.overdue();
  const dueToday = await Todo.dueToday();
  const dueLater = await Todo.dueLater();
  response.render("index",{
    title: "Todo application",
    overdue,
    dueToday,
    dueLater
  });
});

app.get("/todos",(request,response) => {
  console.log("Todo list");
});



app.post("/todos", async (request, response) => {
  console.log("Creating a todo",request.body);
  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
    });
    return response.redirect("/");
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  try {
    const todos = await Todo.findAll();
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

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  const todo = await Todo.findByPk(request.params.id);
  try {
    if (todo) {
      todo.destroy();
      return response.send(true);
    } else {
      return response.send(false);
    }
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

module.exports = app;