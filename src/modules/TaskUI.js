const generateTaskUI = (task) => {
    const taskElement = document.createElement('div')
    taskElement.classList.add('task')

    const taskName = document.createElement('div')
    taskName.classList.add('task-name')
    taskName.innerText = task.taskName

    const fromProject = document.createElement('div')
    fromProject.classList.add('from-project')
    fromProject.innerText = "from project: " + task.project

    const taskDescription = document.createElement('div')
    taskDescription.classList.add('task-description')
    taskDescription.innerText = task.description
    
    const taskDeadLine = document.createElement('div')
    taskDeadLine.classList.add('task-deadline')
    taskDeadLine.innerText = task.deadLine

    taskElement.appendChild(taskName)
    taskElement.appendChild(fromProject)
    taskElement.appendChild(taskDeadLine)
    taskElement.appendChild(taskDescription)


    return taskElement

}

export default generateTaskUI