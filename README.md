# Dashboard-to-manage-Tasks

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Lazy Loading Approach](#lazy-loading-approach)
- [Project Structure](#project-structure)
- [Usage Instructions](#usage-instructions)
- [Future Improvements](#future-improvements)

---

## Introduction

This project is a **MERN Dashboard to manage Tasks** that allows users to manage tasks efficiently with features like search, filtering, and lazy loading. The application demonstrates real-time interaction using REST APIs, user-friendly UI, and optimized data handling strategies.

---

## Features

- **Task Management**: Create, update, delete, and complete tasks.
- **Filters**: Filter tasks by project, priority, labels, or completion status.
- **Search**: Search tasks by name.
- **Lazy Loading**: Load tasks incrementally for better performance.
- **Real-Time Updates**: Reflect task updates instantly using `RTK Query`.

---

## Technologies Used

### Backend:

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**

### Frontend:

- **React.js**
- **Redux Toolkit Query (RTK Query)**
- **TailwindCSS**

## Main Features

### 1. Dashboard

A dashboard that displays the current list of tasks, helping users quickly get an overview of their workload.

![Dashboard](https://i.imgur.com/Eso11p9.png)
![Dashboard](https://i.imgur.com/k0vzlBO.png)
![Dashboard](https://i.imgur.com/oQuoiwk.png)

### 2. Add Task

A feature to add new tasks. Users can input a title, description, and deadline for their tasks.

![Add Task](https://i.imgur.com/JrGptkJ.png)

### 3. Today

Displays a list of tasks that need to be completed today.

![Today](https://i.imgur.com/XDqNAv2.png)

### 4. Filter & Search

Allows users to filter and search tasks based on criteria such as status, deadlines, keywords, ...

![Filter & Search](https://i.imgur.com/BkdKoYr.png)

### 5. Completed & Expired

Displays completed tasks and tasks that have expired.

---

## Project Setup

### Backend Setup

1.  Clone my repository:

    ```bash
    git clone https://github.com/Minh20812/DashboardTasks.git
    cd backend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Set up environment variables: Create a .env file in the backend directory and include. I will show you the .env file above to help you understand better, but please don't use my Mongo link because I will disable it.:

    ```bash
    JWT_SECRET = abac12afsdkjladf
    MONGO_URI = ""
    NODE_ENV = development
    PORT = 5000
    VITE_API_BASE_URL = http://192.168.100.22:5000
    ```

4.  Build server on Render and replace on constants:

    ```
    export const BASE_URL =
    process.env.NODE_ENV === "production"
    ? "https://<yourdasboardtask>.onrender.com"
    : "";
    ```

5.  Replace vite.config.js file with this if you dont have a Render account:

    ```
    // "/api/": "https://<yourdasboardtask>.onrender.com",
    // "/uploads/": "https://<yourdasboardtask>.onrender.com",
    "/api/": "http://localhost:5000/",
    "/uploads/": "http://localhost:5000/",
    ```

6.  Run the server:

    ```
    npm run dev

    ```
### Live Project: https://dashboard-tasks-1erx.vercel.app/
