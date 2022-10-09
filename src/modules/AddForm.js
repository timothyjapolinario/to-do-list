const toggleForm = () =>{
    const popup = document.querySelector(".add-form")
    if(popup.classList.contains('active')){
        popup.reset()
        closeForm()
        return
    }
    openForm()
}

const openForm = () =>{
    const popup = document.querySelector('.add-form')
    popup.classList.add('active')
}

const closeForm = () =>{
    const popup = document.querySelector('.add-form')
    popup.classList.remove('active')
}

const createForm = () =>{
    const parent = document.querySelector('.main-content')
    const form = document.createElement('form')
    form.classList.add('add-form')
    form.action = "#"

    const newTaskNameInput = document.createElement('input')
    newTaskNameInput.type = "text"
    newTaskNameInput.id = "task-name-input"
    
    const newTaskDescription = document.createElement('input')
    newTaskDescription.type = "text"
    newTaskDescription.id = "task-description-input"

    const dateElement = document.createElement('input')
    dateElement.type = "date"
    dateElement.id = "task-date-input"

    const submitButton = document.createElement('button')
    submitButton.innerText="Submit"
    submitButton.type = "submit"
    submitButton.id = "submit-task-button"


    const labelTaskName = document.createElement('label')
    labelTaskName.for ="task-name-input"
    labelTaskName.innerText = "Task Name: "

    const labelTaskDescription = document.createElement('label')
    labelTaskDescription.innerText = "Task Description: "
    labelTaskDescription.for = "task-description-input"


    form.appendChild(labelTaskName)
    form.appendChild(newTaskNameInput)
    form.appendChild(labelTaskDescription)
    form.appendChild(newTaskDescription)
    form.appendChild(dateElement)
    form.appendChild(submitButton)


    
    parent.appendChild(form)
}

export  {toggleForm, openForm, closeForm, createForm}