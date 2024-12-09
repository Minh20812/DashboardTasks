import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  useGetAllTasksQuery,
  useUpdateTaskMutation,
} from "../../../redux/api/taskApiSlice";
import TaskDetailModal from "../today/component/TaskDetailModal";
import enUS from "date-fns/locale/en-US";

const CalendarView = () => {
  const { data: tasks, refetch } = useGetAllTasksQuery();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (tasks) {
      const tasksOnDate = tasks.filter((task) => {
        const taskDate = new Date(task.duedate).setHours(0, 0, 0, 0);
        const selected = selectedDate.setHours(0, 0, 0, 0);
        return taskDate === selected;
      });
      setTasksForSelectedDate(tasksOnDate);
    }
  }, [selectedDate, tasks]);

  const openTaskModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const closeTaskModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const renderTasksForSelectedDate = () => {
    if (tasksForSelectedDate.length > 0) {
      return (
        <div className="task-list mt-4 space-y-3">
          {tasksForSelectedDate.map((task) => (
            <div
              key={task._id}
              className="p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => openTaskModal(task)}
            >
              <h3 className="text-lg md:text-xl font-semibold text-indigo-600 mb-1">
                {task.taskname}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                <strong>Due Date:</strong>{" "}
                {new Date(task.duedate).toLocaleDateString()}
              </p>
              {task.priority && (
                <span
                  className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
                    task.priority === "high"
                      ? "bg-red-200 text-red-800"
                      : task.priority === "medium"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}{" "}
                  Priority
                </span>
              )}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <p className="text-gray-600 text-center py-4">
          No tasks for this date.
        </p>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Calendar View
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            locale="en-US"
            className="w-full"
            calendarClassName="w-full"
            tileClassName="w-full"
            tileContent={({ date, view }) => {
              if (view === "month" && tasks) {
                const tasksOnDate = tasks.filter(
                  (task) =>
                    new Date(task.duedate).setHours(0, 0, 0, 0) ===
                    date.setHours(0, 0, 0, 0)
                );
                return tasksOnDate.length > 0 ? (
                  <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1"></div>
                ) : null;
              }
            }}
          />
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h3 className="text-lg md:text-2xl font-semibold text-gray-800 mb-4 text-center">
            Tasks on {selectedDate.toLocaleDateString()}
          </h3>

          <div className="overflow-auto h-72">
            {" "}
            {renderTasksForSelectedDate()}
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
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

export default CalendarView;
