const taskInterface = () => ({
  type: "taskInterface",
});
const Task = (taskName, description, deadLine, important, project) => {
  const state = {
    taskName,
    description,
    deadLine,
    important,
    project,
  };
  return Object.assign(Object.create(taskInterface(state)), state);
};

export default Task;
