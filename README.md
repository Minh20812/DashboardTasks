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

---

## Project Setup

### Backend Setup

1.  Clone my repository:

    ```bash
    git clone https://github.com/Minh20812/Dashboard-to-manage-Tasks
    cd MERN-TodoApp/backend
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

4.  Run the server:

    ```
    npm run dev

    ```

5.
