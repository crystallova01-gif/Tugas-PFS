import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Go to gym', priority: 'High', status: 'To Do', isEditing: false },
    { id: 2, task: 'Read a book', priority: 'Low', status: 'Done', isEditing: false },
    { id: 3, task: 'Go to market', priority: 'Medium', status: 'In Progress', isEditing: false },
  ]);
  const [nextId, setNextId] = useState(4);

  // Fungsi Create Untuk Menambah Task
  const addTask = (task, priority) => {
    const newTask = {
      id: nextId,
      task,
      priority,
      status: 'To Do',
      isEditing: false
    };
    setTasks([...tasks, newTask]);
    setNextId(nextId + 1);
  };

  // Fungsi Delete Untuk Menghapus Task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Fungsi Update Status Untuk Mengubah Status
  const toggleStatus = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  // Fungsi untuk mengaktifkan/menonaktifkan mode edit
  const toggleEditMode = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, isEditing: !task.isEditing } 
        : { ...task, isEditing: false }
    ));
  };
  
  // Fungsi Update Detail (Mengubah Task dan Priority)
  const editTask = (id, newTask, newPriority) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, task: newTask, priority: newPriority, isEditing: false } 
        : task
    ));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Task List</h1>
      
      {/* Meneruskan fungsi addTask ke TaskForm */}
      <TaskForm addTask={addTask} />
      
      {/* Meneruskan seluruh daftar tugas dan fungsi CRUD ke TaskList */}
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleStatus={toggleStatus}
        toggleEditMode={toggleEditMode}
        editTask={editTask}
      />
    </div>
  );
}

export default App;