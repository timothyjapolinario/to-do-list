import * as Storage from './Storage.js'

const taskListInterface = (state) => ({
    type: "taskListInterface"
})

const TaskList = ()=>{
    let state = {
        tasks:[],
        addTask: (newTask) => {
            if(newTask.type == "taskInterface"){
                Storage.addItem(newTask.taskName,"task",newTask)
            }
        },
        getAllTask: () =>{
            return task
        },
    }
    return Object.assign(Object.create(taskListInterface(state)), state)
}

export default TaskList


