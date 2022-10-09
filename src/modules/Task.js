
const taskInterface = (state) =>({
    type: 'taskInterface'
})
const Task = (taskName, description, deadLine, important, project) =>{
    let state = {
        taskName: taskName,
        description: description,
        deadLine: deadLine,
        important: important,
        project: project
    }
    return Object.assign(Object.create(taskInterface(state)), state)
}


export default Task
