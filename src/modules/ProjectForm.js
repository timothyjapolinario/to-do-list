const openForm = () => {
  const popup = document.querySelector(".add-project-form");
  popup.querySelector("#project-name-input").focus();
  popup.classList.remove("inactive");
};
const closeForm = () => {
  const popup = document.querySelector(".add-project-form");
  popup.classList.add("inactive");
};
const toggleForm = () => {
  const popup = document.querySelector(".add-project-form");
  if (popup.classList.contains("inactive")) {
    openForm();
    return;
  }
  popup.reset();
  closeForm();
};

const createForm = () => {
  const parent = document.querySelector(".project-menu");
  const form = document.createElement("form");
  form.classList.add("add-project-form");
  form.action = "#";
  const newProjectNameInput = document.createElement("input");
  newProjectNameInput.type = "text";
  newProjectNameInput.id = "project-name-input";

  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  submitButton.type = "submit";
  submitButton.id = "submit-project-button";

  const labelProjectName = document.createElement("label");
  labelProjectName.for = "project-name-input";
  labelProjectName.innerText = "Project Name: ";

  form.appendChild(labelProjectName);
  form.appendChild(newProjectNameInput);
  form.appendChild(submitButton);

  parent.appendChild(form);
};

export { toggleForm, openForm, closeForm, createForm };
