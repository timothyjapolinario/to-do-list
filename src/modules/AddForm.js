const toggleForm = () =>{
    const popup = document.querySelector(".add-form")
    if(popup.classList.contains('inactive')){
        openForm(popup)
        return
    }
    popup.reset()
    closeForm(popup)
}

const openForm = (popup) =>{
    popup.classList.remove('inactive')
}

const closeForm = (popup) =>{
    popup.classList.add('inactive')
}

const createForm = () =>{
    const parent = document.querySelector('body')
    const form = document.createElement('form')
    form.classList.add('add-form')
    form.classList.add('inactive')
    form.action = "#"


    const closeButton = document.createElement('img')
    closeButton.src = "./images/close-icon.png"
    closeButton.classList.add('close-button-new-task')

    const formTitle = document.createElement('div')
    formTitle.innerText = "New Task!"
    formTitle.classList.add('form-task-title')

    const newTaskNameInput = document.createElement('input')
    newTaskNameInput.type = "text"
    newTaskNameInput.id = "task-name-input"
    newTaskNameInput.required = true

    const newTaskDescription = document.createElement('textarea')
    newTaskDescription.id = "task-description-input"
    newTaskDescription.required = true
    newTaskDescription.rows = "10"

    const dateElement = document.createElement('input')
    dateElement.type = "date"
    dateElement.id = "task-date-input"
    dateElement.required = true

    const newTaskImportance = document.createElement('input')
    newTaskImportance.type = "checkbox"
    newTaskImportance.id = "task-importance-input"

    const submitButton = document.createElement('button')
    submitButton.innerText="Submit"
    submitButton.type = "submit"
    submitButton.id = "submit-task-button"


    const labelTaskName = document.createElement('label')
    labelTaskName.for ="task-name-input"
    labelTaskName.innerText = "Task Name: "

    const labelDeadline = document.createElement('label')
    labelDeadline.innerText = "Deadline: "
    labelDeadline.for = "Deadline"

    const labelTaskDescription = document.createElement('label')
    labelTaskDescription.innerText = "Task Description: "
    labelTaskDescription.for = "task-description-input"

    const labelImportance = document.createElement('label')
    labelImportance.for ="task-importance-input"
    labelImportance.innerText = "Important?"

    const wrapperImportance= document.createElement('div')
    wrapperImportance.appendChild(labelImportance)
    wrapperImportance.appendChild(newTaskImportance)

    form.appendChild(formTitle)
    form.append(closeButton)
    form.appendChild(labelTaskName)
    form.appendChild(newTaskNameInput)
    form.appendChild(labelTaskDescription)
    form.appendChild(newTaskDescription)
    form.appendChild(labelDeadline)
    form.appendChild(dateElement)
    form.appendChild(wrapperImportance)
    form.appendChild(submitButton)
    


    
    parent.appendChild(form)
}

export  {toggleForm, openForm, closeForm, createForm}