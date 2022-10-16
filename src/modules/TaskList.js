import * as Storage from "./Storage";

const taskListInterface = () => ({
  type: "taskListInterface",
});

const TaskList = () => {
  const state = {
    tasks: [],
    addTask: (newTask) => {
      if (newTask.type === "taskInterface") {
        Storage.addItem(newTask.taskName, "task", newTask);
      }
    },
  };
  return Object.assign(Object.create(taskListInterface(state)), state);
};

export default TaskList;
