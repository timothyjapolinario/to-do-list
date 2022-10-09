import Task from "./Task";
import TaskList from "./TaskList";
import generateTaskUI from "./TaskUI.js";
import * as Form from "./AddForm.js";
import Project from "./Project.js";
import * as Storage from "./Storage.js"
import generateProjectUI from "./ProjectUI";
import * as ProjectForm from "./ProjectForm.js"
import { format, compareAsc } from 'date-fns'
const loadHomePage = () => {
    //localStorage.clear()
    Form.createForm()
    renderAllTasks()
    initEventListeners()
    initializeDefaultProject()
    initializeDummyProject()
    loadAllProjects()
}

const initializeDefaultProject = () =>{
    if(Storage.getItem("DefaultProject")!==null){
        setActiveProject("DefaultProject")
    }else{
        const defaultProject = Project("DefaultProject", TaskList())
        Storage.addItem("DefaultProject", "default-project", defaultProject, "Project Exist!")
        setActiveProject("DefaultProject")
    }
}

const initializeDummyProject = () =>{
    if(Storage.getItem("DummyProject")===null){
        const dummyProject = Project("DummyProject", TaskList())
        Storage.addItem("DummyProject", "project", dummyProject, "Project Exist!")
    }
}

const initEventListeners = () =>{
    const tasksUI = document.querySelector(".all-task-button")
    tasksUI.addEventListener('click', ()=>{
        removeSelectedProject()
        renderAllTasks()
    })
    const allImportantTaskButton = document.querySelector(".all-important-button")
    allImportantTaskButton.addEventListener('click', ()=>{
        renderAllImportantTask()
    })
    const addFormButton = document.querySelectorAll(".toggle-form-button")
    addFormButton.forEach(button =>{
        button.addEventListener('click',Form.toggleForm)
    })
    const addProjectButton = document.querySelector(".add-project-button")
    addProjectButton.addEventListener('click',()=>{
        ProjectForm.toggleForm()
    })
    const submitButton = document.querySelector("#submit-task-button")
    submitButton.addEventListener('click', ()=>{
        addTask()
    })
    const submitProjectButton = document.querySelector("#submit-project-button")
    
    submitProjectButton.addEventListener('click', ()=>{
        const projectName = document.querySelector("#project-name-input")
        if(projectName.value == ''){
            projectName.style.border ="2px solid red"
            console.log("Invalid Input")
            return
        }
        addProject(projectName.value)
        projectName.style.border =""
    })
}



const addProject = (projectName)=>{
    if(projectName == ""){
        return
    }
    const project = Project(projectName, TaskList())
    const storageProject = Storage.addItem(projectName, "project", project, "Error Adding New Project")
    renderProject(storageProject)
    ProjectForm.toggleForm()
}
const renderProject = (storageProject)=>{
    //add Project to Storage
    const projectList= document.querySelector(".project-list")
    const projectUI = generateProjectUI(storageProject.object, storageProject.key)
    projectUI.addEventListener('click', ()=>{
        if(storageProject.key != getActiveProjectKey()){
            setActiveProject(storageProject.key)
            removeSelectedProject()
            renderTasks()
        }
        projectUI.classList.add('selected-project')
    })
    projectUI.querySelector('.delete-button').addEventListener('click',()=>{
        Storage.removeItem(storageProject.key)
        projectUI.remove()
        renderAllTasks()
    })
    const projectOptions = projectUI.querySelector('.project-options')
    projectUI.querySelector('.option-button').addEventListener('click', ()=>{
        toggleOptions(projectOptions)
    })
    projectList.appendChild(projectUI)
}

const getActiveProjectKey = ()=>{
    return Storage.getItem('ActiveProject').projectKey
}

const toggleOptions = (optionsUI) =>{
    if(optionsUI.classList.contains('inactive')){
        optionsUI.classList.remove('inactive')
        return
    }
    optionsUI.classList.add('inactive')

}

const removeSelectedProject = () =>{
    const previousSelectedProjectUI = document.querySelector('.selected-project')
    if(previousSelectedProjectUI !== null){
        previousSelectedProjectUI.classList.remove('selected-project')
        previousSelectedProjectUI.querySelector('.project-options').classList.add('inactive')
    }

}
const loadAllProjects = () =>{
    //get list of projects in storage
    const storeProjects = Storage.getAllStoreObjectsWithKeys('project')
    const parent = document.querySelector(".project-list")
    //for each project, get the ui element
    storeProjects.forEach(storeProject =>{
        renderProject(storeProject)
    })
}

const setActiveProject = (key) =>{
    if(Storage.getItem("ActiveProject")!==null){
        Storage.updateItem("ActiveProject", {projectKey: key})
    }else{
        Storage.addItem("ActiveProject","active_project",{projectKey: key},"Active Project Exist!")
    }
}
const renderAllImportantTask = ()=>{
    removeAllTaskElement()
    const storeProjects = Storage.getAllStoreObjects('project')
    storeProjects.forEach(storeProject=>{
         storeProject.object.taskList.tasks.forEach(task=>{
            console.log(task.important)
            if(task.important){
                const taskListUI = document.querySelector('.task-list')
                taskListUI.appendChild(generateTaskUI(task)) 
            }
         })
    })
}
const renderAllTasks = ()=>{
    removeAllTaskElement()
   const storeProjects = Storage.getAllStoreObjects('project')
   storeProjects.forEach(storeProject=>{
        storeProject.object.taskList.tasks.forEach(task=>{
            const taskListUI = document.querySelector('.task-list')
            taskListUI.appendChild(generateTaskUI(task)) 
        })
        
   })
}
const renderTasks = ()=>{
    const activeProject = getActiveProject()
    if(activeProject !== null){
        const tasks = getActiveProject().taskList.tasks
        const taskListUI = document.querySelector('.task-list')
        removeAllTaskElement()
        tasks.forEach(task=>{
            taskListUI.appendChild(generateTaskUI(task)) 
        })
    }
}

const addTask = () =>{
    const activeProject = getActiveProject()
    const defaultProject = getDefaultProject()
    const projectKey = Storage.getItem('ActiveProject').projectKey
    const taskName = document.querySelector('#task-name-input').value
    const taskDescription = document.querySelector('#task-description-input').value
    const taskDateInput = document.querySelector("#task-date-input").value
    const isImportant = document.querySelector("#task-importance-input").checked
    if((taskName == "")||(taskDescription == "")||(taskDateInput == "")){
        return console.log("Invalid input")
    }
    const newTask = Task(taskName, taskDescription, getDateInput(taskDateInput) , isImportant, activeProject.projectName)
    activeProject.taskList.tasks.push(newTask)
    defaultProject.taskList.tasks.push(newTask)
    Storage.updateItem(projectKey, activeProject)
    Storage.updateItem("DefaultProject", defaultProject)
    renderTasks()
    Form.toggleForm();
    console.log(newTask)
}
const getDefaultProject = ()=>{
    return Storage.getItem("DefaultProject")
}
const getDateInput = (taskDateInput) =>{
    
    taskDateInput = taskDateInput.split("-")
    const taskDateInputInt = taskDateInput.map(date =>{
        date = parseInt(date)
        return date
    })
    const taskDate = format(new Date(taskDateInputInt[0], taskDateInputInt[1], taskDateInputInt[2]), 'MM/dd/yyyy')
    return taskDate
}

const getActiveProject = () =>{
    const projectKey = Storage.getItem('ActiveProject').projectKey
    const project = Storage.getItem(projectKey)
    return project
}

const removeAllTaskElement = () => {
    const taskElements = document.querySelectorAll('.task')
    taskElements.forEach(taskElement=>{
        taskElement.remove()
    })
}





export {loadHomePage}
