import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  // FETCH TASKS
  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD OR UPDATE TASK
  const addTask = async () => {
    if (!title) return;

    if (editId) {
      await axios.put(`http://localhost:5000/api/tasks/${editId}`, {
        title,
      });
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/tasks", {
        title,
      });
    }

    setTitle("");
    fetchTasks();
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  // EDIT TASK
  const editTask = (task) => {
    setTitle(task.title);
    setEditId(task._id);
  };

  return (
    <div className="container">
      <h2>My To-Do List</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}

            <div className="buttons">
              <button className="edit" onClick={() => editTask(task)}>
                Edit
              </button>
              <button
                className="delete"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
