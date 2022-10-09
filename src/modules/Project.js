
const projectInterface = (state) =>({
    type: 'projectInterface'
})
const Project = (projectName, taskList) =>{
    if(taskList.type != 'taskListInterface'){
        console.log("Parameter TaskList is not type taskListInterface")
        return null;
    }
    let state = {
        projectName: projectName,
        taskList: taskList
    }
    return Object.assign(Object.create(projectInterface(state)), state)
}


export default Project
