import Task from "../models/TaskModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const validateTaskFields = (data) => {
  if (
    !data.taskname ||
    !data.description ||
    !data.project ||
    !data.duedate ||
    !data.priority
  ) {
    throw new Error("Required fields are missing");
  }

  if (
    !Array.isArray(data.subtasks) ||
    data.subtasks.some((subtask) => !subtask.name)
  ) {
    throw new Error("Each subtask must have a name");
  }
};

const addTask = asyncHandler(async (req, res) => {
  const {
    taskname,
    description,
    subtasks,
    project,
    duedate,
    priority,
    labels,
    reminder,
    location,
  } = req.body;

  validateTaskFields(req.body);

  const taskExists = await Task.findOne({ taskname, project });
  if (taskExists) {
    return res.status(400).json({
      message: "Task with the same name in this project already exists",
    });
  }

  const newTask = new Task({
    taskname,
    description,
    subtasks: subtasks.map((subtask) => ({ name: subtask.name })),
    project,
    duedate,
    priority,
    labels,
    reminders: [new Date(reminder)],
    location,
  });

  await newTask.save();

  return res.status(201).json({
    _id: newTask._id,
    taskname: newTask.taskname,
    project: newTask.project,
    duedate: newTask.duedate,
    priority: newTask.priority,
  });
});

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  if (!tasks) {
    return res.status(404).json({ message: "No tasks found" });
  }
  res.json(tasks);
});

const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res
      .status(404)
      .json({ message: `Task with ID ${req.params.id} not found` });
  }
  res.json(task);
});

const deleteTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res
      .status(404)
      .json({ message: `Task with ID ${req.params.id} not found` });
  }

  await Task.deleteOne({ _id: req.params.id });
  res.json({ message: `Task with ID ${req.params.id} deleted successfully` });
});

const updateTaskById = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res
        .status(404)
        .json({ message: `Task with ID ${req.params.id} not found` });
    }

    task.taskname = req.body.taskname || task.taskname;
    task.description = req.body.description || task.description;

    task.subtasks = Array.isArray(req.body.subtasks)
      ? req.body.subtasks
      : task.subtasks;

    task.project = req.body.project || task.project;
    task.duedate = req.body.duedate || task.duedate;
    task.priority = req.body.priority || task.priority;

    task.labels = Array.isArray(req.body.labels)
      ? req.body.labels
      : task.labels;

    task.reminders = Array.isArray(req.body.reminders)
      ? req.body.reminders
      : task.reminders;

    task.location = req.body.location || task.location;

    if (req.body.completed !== undefined) {
      task.completed = req.body.completed;
    }

    const updatedTask = await task.save();

    res.json({
      _id: updatedTask._id,
      taskname: updatedTask.taskname,
      description: updatedTask.description,
      subtasks: updatedTask.subtasks,
      project: updatedTask.project,
      duedate: updatedTask.duedate,
      priority: updatedTask.priority,
      labels: updatedTask.labels,
      reminders: updatedTask.reminders,
      location: updatedTask.location,
      completed: updatedTask.completed,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while updating the task",
      error: error.message,
    });
  }
});

export { addTask, getAllTasks, deleteTaskById, getTaskById, updateTaskById };
