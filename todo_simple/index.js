const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [];

app.get("/", (req, res) => {
  res.render("index", { todos: todos });
});

app.post("/add", (req, res) => {
  const task = req.body.task.trim();
  const priority = req.body.priority;
  if (task === "") {
    return res.send("<script>alert('Please enter a task!'); window.location.href='/'</script>");
  }
  todos.push({ task: task, priority: priority });
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const index = req.body.index;
  todos.splice(index, 1);
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const index = req.body.index;
  const newTask = req.body.newTask.trim();
  const priority = req.body.newPriority;
  if (newTask === "") {
    return res.send("<script>alert('Task cannot be empty!'); window.location.href='/'</script>");
  }
  todos[index] = { task: newTask, priority: priority };
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
