import * as Storage from "./Storage";

const addProject = (newProject) => {
  if (newProject.type === "projectInterface") {
    Storage.addItem(newProject.projectName, "task", newProject);
  }
};

const getAllProject = () => {
  const projectsFromLocal = Storage.getAllItem("project");
  return projectsFromLocal;
};

export { addProject, getAllProject };
