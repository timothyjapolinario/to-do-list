
const taskInterface = (state) =>({
    type: 'taskInterface'
})
const Task = (taskName, description, deadLine) =>{
    let state = {
        taskName: taskName,
        description: description,
        deadLine: deadLine
    }
    return Object.assign(Object.create(taskInterface(state)), state)
}


export default Task
