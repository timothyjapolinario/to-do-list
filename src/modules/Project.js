const projectInterface = () => ({
  type: "projectInterface",
});
const Project = (projectName, taskList, completeStatus) => {
  if (taskList.type !== "taskListInterface") {
    return null;
  }
  const state = {
    projectName,
    taskList,
    completeStatus,
  };
  return Object.assign(Object.create(projectInterface(state)), state);
};

export default Project;
