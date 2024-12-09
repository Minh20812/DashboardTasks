import React, { useState, useEffect } from "react";
import {
  useGetAllTasksQuery,
  useUpdateTaskMutation,
} from "../../../redux/api/taskApiSlice";
import TaskDetailModal from "../today/component/TaskDetailModal";

const priorities = [
  { name: "Low", value: "low" },
  { name: "Medium", value: "medium" },
  { name: "High", value: "high" },
];

const ITEMS_PER_PAGE = 10;

const MainFilterAndLabels = () => {
  const { data: tasks, refetch } = useGetAllTasksQuery();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [updateTask] = useUpdateTaskMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedCompletedStatus, setSelectedCompletedStatus] = useState("");

  const [visibleTasks, setVisibleTasks] = useState(ITEMS_PER_PAGE);

  const openTaskModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const closeTaskModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const filteredTasks = tasks
    ? tasks.filter((task) => {
        const matchSearchTerm = searchTerm
          ? task.taskname.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
        const matchLabel = selectedLabel
          ? task.labels.includes(selectedLabel)
          : true;
        const matchProject = selectedProject
          ? task.project === selectedProject
          : true;
        const matchPriority = selectedPriority
          ? task.priority === selectedPriority
          : true;
        const matchCompleted =
          selectedCompletedStatus === ""
            ? true
            : selectedCompletedStatus === "completed"
            ? task.completed === true
            : task.completed === false;

        return (
          matchSearchTerm &&
          matchLabel &&
          matchProject &&
          matchPriority &&
          matchCompleted
        );
      })
    : [];

  const handleCompleteTask = async (e, taskId) => {
    e.stopPropagation();
    try {
      const result = await updateTask({
        id: taskId,
        completed: true,
      }).unwrap();
      console.log("Task marked as completed:", result);
      refetch();
    } catch (error) {
      console.log("Error marking task as completed:", error);
    }
  };

  const handleUnCompleteTask = async (e, taskId) => {
    e.stopPropagation();
    try {
      const result = await updateTask({
        id: taskId,
        completed: false,
      }).unwrap();
      console.log("Task marked as incomplete:", result);
      refetch();
    } catch (error) {
      console.log("Error marking task as incomplete:", error);
    }
  };

  const handleLoadMore = () => {
    setVisibleTasks((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 flex justify-center items-center">
        Filter and Search Tasks
      </h2>

      <div className="mb-6">
        <label className="block text-gray-600 font-semibold mb-2">
          Search by Taskname:
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg p-2 w-full"
          placeholder="Enter task name"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6">
        <div className="mb-4 sm:mb-0">
          <label className="block text-gray-600 font-semibold mb-2">
            Filter by Status:
          </label>
          <select
            className="border rounded-lg p-2 w-full"
            value={selectedCompletedStatus}
            onChange={(e) => setSelectedCompletedStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        <div className="mb-4 sm:mb-0">
          <label className="block text-gray-600 font-semibold mb-2">
            Filter by Label:
          </label>
          <select
            className="border rounded-lg p-2 w-full"
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
          >
            <option value="">All Labels</option>
            {tasks &&
              Array.from(new Set(tasks.flatMap((task) => task.labels))).map(
                (label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                )
              )}
          </select>
        </div>

        <div className="mb-4 sm:mb-0">
          <label className="block text-gray-600 font-semibold mb-2">
            Filter by Project:
          </label>
          <select
            className="border rounded-lg p-2 w-full"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">All Projects</option>
            {tasks &&
              Array.from(new Set(tasks.map((task) => task.project))).map(
                (project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                )
              )}
          </select>
        </div>

        <div>
          <label className="block text-gray-600 font-semibold mb-2">
            Filter by Priority:
          </label>
          <select
            className="border rounded-lg p-2 w-full"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <option value="">All Priorities</option>
            {priorities.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredTasks.slice(0, visibleTasks).map((task) => (
            <div
              key={task._id}
              className="p-4 sm:p-6 bg-white rounded-lg shadow-lg hover:cursor-pointer"
              onClick={() => openTaskModal(task)}
            >
              <h3 className="text-xl font-semibold text-indigo-600">
                {task.taskname}
              </h3>
              <p className="text-gray-600">
                <strong>Due Date:</strong>{" "}
                {task.duedate
                  ? new Date(task.duedate).toLocaleDateString()
                  : "No due date"}
              </p>

              {task.completed ? (
                <button
                  className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                  onClick={(e) => handleUnCompleteTask(e, task._id)}
                >
                  Completed
                </button>
              ) : (
                <button
                  className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                  onClick={(e) => handleCompleteTask(e, task._id)}
                >
                  InComplete
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No tasks available.</p>
      )}

      {filteredTasks.length > visibleTasks && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:outline-none"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}

      {selectedTask && (
        <TaskDetailModal
          isOpen={isModalOpen}
          closeModal={closeTaskModal}
          task={selectedTask}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default MainFilterAndLabels;
