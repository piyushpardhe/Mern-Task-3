const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const Task = require("./models/Task");

// 🔹 CONNECT TO MONGODB
mongoose.connect("mongodb+srv://mernuser:mern123@cluster0.gxsia0n.mongodb.net/todoapp?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// =====================
// CREATE TASK
// =====================
app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
    });

    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// =====================
// GET ALL TASKS
// =====================
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// =====================
// UPDATE TASK
// =====================
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// =====================
// DELETE TASK
// =====================
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
