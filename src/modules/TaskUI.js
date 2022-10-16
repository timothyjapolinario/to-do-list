const generateTaskUI = (task) => {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");

  const completeButton = document.createElement("div");
  completeButton.classList.add("complete-task-button");
  const completeImage = document.createElement("img");
  completeImage.src = "./images/empty-circle.png";
  completeButton.appendChild(completeImage);

  const taskInformations = document.createElement("div");
  taskInformations.classList.add("task-information");

  const importantButton = document.createElement("div");
  importantButton.classList.add("task-important-button");
  if (task.important) {
    importantButton.innerText = "Important!!";
    importantButton.classList.add("important");
  } else {
    importantButton.innerText = "Not Important";
  }

  const taskName = document.createElement("div");
  taskName.classList.add("task-name");
  taskName.innerText = task.taskName;

  const fromProject = document.createElement("div");
  fromProject.classList.add("from-project");
  fromProject.innerText = `from project: ${task.project}`;

  const taskDescription = document.createElement("div");
  taskDescription.classList.add("task-description");
  taskDescription.innerText = task.description;

  const taskDeadLine = document.createElement("div");
  taskDeadLine.classList.add("task-deadline");
  taskDeadLine.innerText = task.deadLine;

  taskInformations.appendChild(taskName);
  taskInformations.appendChild(fromProject);
  taskInformations.appendChild(taskDeadLine);
  taskInformations.appendChild(taskDescription);
  taskInformations.appendChild(importantButton);

  taskElement.appendChild(completeButton);
  taskElement.appendChild(taskInformations);

  return taskElement;
};

export default generateTaskUI;
