import * as Storage from './Storage.js'

const addProject =(newProject) => {
    if(newProject.type == "projectInterface"){
        Storage.addItem(newProject.projectName,"task",newTask)
    }
}
const removeProject = (projectName) => {
    
}

const getAllProject = () =>{
    const projectsFromLocal = Storage.getAllItem("project");
    return projectsFromLocal
}




export {addProject, removeProject, getAllProject}


