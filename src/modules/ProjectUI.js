import * as Storage from './Storage.js'
const generateProjectUI = (project, id) => {
    const projectElement = document.createElement('div')
    projectElement.classList.add('project')

    const projectName = document.createElement('div')
    projectName.classList.add('project-name')
    projectName.innerText = project.projectName


    // const completedButton = document.createElement('div')
    // completedLogo.src="./images/empty-circle.png"
    // completedButton.appendChild(completedLogo)
    // completedButton.classList.add('complete-button')

    // projectElement.appendChild(completedButton)

    const projectOptions = document.createElement('div')
    projectOptions.classList.add('project-options')
    projectOptions.classList.add('inactive')

    const completeButton = document.createElement('div')
    const completeLogo = document.createElement('img')
    completeLogo.src = "./images/check-icon.png"
    completeButton.classList.add('complete-button')
    completeButton.appendChild(completeLogo)

    const projectOptionButton = document.createElement('div')
    const optionLogo = document.createElement('img')
    optionLogo.src = "./images/triangle-icon.png"
    projectOptionButton.appendChild(optionLogo)
    projectOptionButton.classList.add('option-button')

    const projectEditButton = document.createElement('div')
    const editLogo = document.createElement('img')
    editLogo.src = "./images/edit-icon.png"
    projectEditButton.appendChild(editLogo)
    projectEditButton.classList.add("edit-button")

    const deleteButton = document.createElement('div')
    const deleteLogo = document.createElement('img')
    deleteLogo.src = "./images/trash-icon.png"
    deleteButton.appendChild(deleteLogo)
    deleteButton.classList.add('delete-button')
    
    projectOptions.appendChild(deleteButton)
    projectOptions.appendChild(completeButton)
  
    projectElement.appendChild(projectName)
    projectElement.appendChild(projectEditButton)
    projectElement.appendChild(projectOptionButton)

    projectElement.appendChild(projectOptions)




    return projectElement

}

export default generateProjectUI