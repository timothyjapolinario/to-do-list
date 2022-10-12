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
        const defaultProject = Project("DefaultProject", TaskList(), false)
        Storage.addItem("DefaultProject", "project", defaultProject, "Project Exist!")
        setActiveProject("DefaultProject")
    }
}

const initializeDummyProject = () =>{
    if(Storage.getItem("DummyProject")===null){
        const dummyProject = Project("DummyProject", TaskList(), false)
        Storage.addItem("DummyProject", "project", dummyProject, "Project Exist!")
    }
}

const initEventListeners = () =>{
    window.addEventListener('click', function(e){   
        if (!document.querySelector('.project-header').contains(e.target)){
          ProjectForm.closeForm()
        }
      });
    const defaultProjectButton = document.querySelector('.default-project-button')
    defaultProjectButton.addEventListener('click', ()=>{
        setActiveProject('DefaultProject')
        removeSelectedTaskMenu()
        defaultProjectButton.classList.add('selected-task-menu-option')
        removeSelectedProject()
        renderTasks(getActiveProject())
    })

    const tasksUI = document.querySelector(".all-task-button")
    tasksUI.addEventListener('click', ()=>{
        setActiveProject('DefaultProject')
        removeSelectedProject()
        removeSelectedTaskMenu()
        tasksUI.classList.add('selected-task-menu-option')
        renderAllTasks()
    })
    const allImportantTaskButton = document.querySelector(".all-important-button")
    allImportantTaskButton.addEventListener('click', ()=>{
        removeSelectedProject()
        removeSelectedTaskMenu()
        allImportantTaskButton.classList.add('selected-task-menu-option')
        renderAllImportantTask()
    })
    const addFormButton = document.querySelectorAll(".toggle-form-button")
    const wrapper = document.querySelector(".wrapper")
    addFormButton.forEach(button =>{
        button.addEventListener('click',()=>{
            Form.toggleForm()
            wrapper.style.pointerEvents = "none"
        })
    })

    const closeFormButton = document.querySelector(".close-button-new-task")
    closeFormButton.addEventListener('click',()=>{
        Form.toggleForm()
        wrapper.style.pointerEvents = "auto"
    })
    const addProjectButton = document.querySelector(".add-project-button")
    const projectNameInput = document.querySelector('#project-name-input')
    addProjectButton.addEventListener('click',()=>{
        ProjectForm.toggleForm()
        projectNameInput.focus()
    })
    const submitButton = document.querySelector("#submit-task-button")
    submitButton.addEventListener('click', ()=>{
        addTask()

        wrapper.style.pointerEvents = "auto"
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


const removeSelectedTaskMenu = ()=>{
    const selected = document.querySelector('.selected-task-menu-option')
    if((selected !== null)){
        selected.classList.remove('selected-task-menu-option')
    }
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
    const completedProjectList = document.querySelector(".completed-project-list")
    const projectUI = generateProjectUI(storageProject.object, storageProject.key)
    projectUI.addEventListener('click', ()=>{
        if(storageProject.key != getActiveProjectKey()){
            setActiveProject(storageProject.key)
            removeSelectedProject()
            renderTasks(getActiveProject())
        }
        projectUI.classList.add('selected-project')
    })
    projectUI.querySelector('.delete-button').addEventListener('click',()=>{
        Storage.removeItem(storageProject.key)
        projectUI.remove()
        renderAllTasks()
    })
    projectUI.querySelector('.complete-project-button').addEventListener('click',()=>{
        toggleCompletion(storageProject)
    })
    const projectOptions = projectUI.querySelector('.project-options')
    projectUI.querySelector('.option-button').addEventListener('click', ()=>{
        toggleOptions(projectOptions)
    })

    const projectName = projectUI.querySelector(".project-name")
    projectName.addEventListener('dblclick',()=>{
        editProjectName(storageProject.key, projectName)
    })

    if(storageProject.object.completeStatus){
        completedProjectList.appendChild(projectUI)
    }else{
        projectList.appendChild(projectUI)
    }
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
const toggleCompletion = (storageProject) =>{
    console.log(storageProject)
    const project = storageProject.object
    const key = storageProject.key
    console.log(project)
    console.log("-----")
    if(project.completeStatus){
        project.completeStatus = false
    }else{
        project.completeStatus = true
    }
    Storage.updateItem(key, project)
    removeAllProjectUI()
    loadAllProjects()
}
const removeAllProjectUI = ()=>{
    const projectList= document.querySelector(".project-list")
    const completedProjectList = document.querySelector(".completed-project-list")

    removeAllChildNodes(projectList)
    removeAllChildNodes(completedProjectList)
}
const removeSelectedProject = () =>{
    const previousSelectedProjectUI = document.querySelector('.selected-project')
    console.log("lol")
    if(previousSelectedProjectUI !== null){
        previousSelectedProjectUI.classList.remove('selected-project')
        previousSelectedProjectUI.querySelector('.project-options').classList.add('inactive')
    }

}
const loadAllProjects = () =>{
    //get list of projects in storage
    const storeProjects = Storage.getAllStoreObjectsWithKeys('project')
    //for each project, get the ui element
    storeProjects.forEach(storeProject =>{
        if(!(storeProject.key == "DefaultProject")){
            renderProject(storeProject)
        }
        
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
         storeProject.object.taskList.tasks.forEach((task,index)=>{
            console.log(task.important)
            if(task.important){
                const taskListUI = document.querySelector('.task-list')
                const taskUI = generateTaskUI(task)
                taskListUI.appendChild(taskUI) 
                taskUI.querySelector('.complete-task-button').addEventListener('click',()=>{
                    completeTask(task,index)
                })
                const taskNameUI = taskUI.querySelector('.task-name')
                taskNameUI.addEventListener('dblclick', ()=>{
                    editTaskName(task,index,taskNameUI)
                })
                const importantButton = taskUI.querySelector('.task-important-button')
                importantButton.addEventListener('click',()=>{
                    toggleTaskImportance(task,index,importantButton)
                })
            }
         })
    })
}
const renderAllTasks = ()=>{
    removeAllTaskElement()
   const storeProjects = Storage.getAllStoreObjects('project')
   const defaultProject = Storage.getItem('DefaultProject')
   storeProjects.forEach(storeProject=>{
        storeProject.object.taskList.tasks.forEach((task,index)=>{
            const taskListUI = document.querySelector('.task-list')
            const taskUI = generateTaskUI(task)
            taskListUI.appendChild(taskUI) 
            taskUI.querySelector('.complete-task-button').addEventListener('click',()=>{
                completeTask(task,index)
            })
            const taskNameUI = taskUI.querySelector('.task-name')
            taskNameUI.addEventListener('dblclick', ()=>{
                editTaskName(task,index,taskNameUI)
            })
            const importantButton = taskUI.querySelector('.task-important-button')
            importantButton.addEventListener('click',()=>{
                toggleTaskImportance(task,index,importantButton)
            })
        })
   })
}
const renderTasks = (project)=>{
    if(project !== null){
        const tasks = project.taskList.tasks
        const taskListUI = document.querySelector('.task-list')
        removeAllTaskElement()
        tasks.forEach((task,index)=>{
            let taskUI = generateTaskUI(task)
            taskListUI.appendChild(taskUI)
            const taskNameUI = taskUI.querySelector('.task-name')
            taskNameUI.addEventListener('dblclick', ()=>{
                editTaskName(task,index,taskNameUI)
            })
            taskUI.querySelector('.complete-task-button').addEventListener('click',()=>{
                completeTask(task,index)
            })
            const importantButton = taskUI.querySelector('.task-important-button')
            importantButton.addEventListener('click',()=>{
                toggleTaskImportance(task, index,importantButton)
            })
        })
    }
}
const toggleTaskImportance = (task,index, element) =>{
    console.log("lol")
    const project = Storage.getItem(task.project)
    if(task.important){
        task.important = false
        element.innerText = "Not Important"
        element.classList.remove('important')
    }else{
        task.important = true
        element.innerText = "Important!!"
        element.classList.add('important')
    }
    project.taskList.tasks[index] = task
    Storage.updateItem(task.project, project)
    console.log(project)
}
const editProjectName = (projectKey, element) =>{
    const project = Storage.getItem(projectKey)
    const inputProjectName = document.createElement('input')

    if(document.querySelector(".edit-input") === null){
        inputProjectName.type = "text"
        inputProjectName.classList.add('edit-input')
        inputProjectName.addEventListener('focusout', ()=>{
            console.log("focusout!")
            if(inputProjectName.value != ""){
                element.innerText = inputProjectName.value
                console.log(project.projectName)
                project.projectName = inputProjectName.value
                console.log(project.projectName)
                Storage.addItem(inputProjectName.value, 'project', project, "Error updating project")
                Storage.removeItem(projectKey)
            }
            inputProjectName.remove()
        })
        element.appendChild(inputProjectName)
        inputProjectName.focus()
    }
}
const editTaskName = (task,index, element) =>{
    const inputTaskName = document.createElement('input')
    if(document.querySelector(".edit-input") === null){
        inputTaskName.type = "text"
        inputTaskName.classList.add('edit-input')
        inputTaskName.addEventListener('focusout', ()=>{
            if(inputTaskName.value != ""){
                const project = Storage.getItem(task.project)
                element.innerText = inputTaskName.value
                task.taskName = inputTaskName.value
                project.taskList.tasks[index] = task
                Storage.updateItem(task.project, project)
            }
            inputTaskName.remove()
        })
        element.appendChild(inputTaskName)
        inputTaskName.focus()

    }
}
const completeTask = (task,index)=>{
    const project = Storage.getItem(task.project)
    const taskList = project.taskList.tasks

    if(index > 0){
        taskList.splice(index,index)
    }else{
        taskList.splice(index,1)
    }
    
    console.log(taskList)
    Storage.updateItem(task.project, project)
    renderTasks(getActiveProject())
}
const addTask = () =>{
    const activeProject = getActiveProject()
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
    Storage.updateItem(projectKey, activeProject)
    renderTasks(activeProject)
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

const loadCompletedProjects = ()=>{
    const storeProjects = Storage.getAllStoreObjectsWithKeys('project')
    //for each project, get the ui element
    storeProjects.forEach(storeProject =>{
        if(storeProject.completeStatus){
            renderCompletedProject(storeProject)
        }
    })
}
const renderCompletedProject = (project) =>{

}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export {loadHomePage}
