import projectData from '../data/profileData.json' assert { type: "json" };
import usersData from '../data/users.json' assert { type: "json"}


// Function that redirect to login Page
window.onload = function () {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
        localStorage.removeItem("userEmail");
        location.href = "http://127.0.0.1:5500/userLogin.html";
    }
    else {
        console.log("Email from local storage:", userEmail);
        userData(userEmail);
    }

};

// show user data of login user
function userData(userEmail) {
    // Find the user by email
    const user = usersData.users.find(item => item.email === userEmail);

    if (user) {
        const name = document.getElementById("userName");
        const role = document.getElementById("userRole");
        const email = document.getElementById("userEmail");

        function appendAttribute(targetElement, attributeName, attributeValue) {
            const entryElement = document.createElement('p');
            entryElement.textContent = `${attributeName}: ${Array.isArray(attributeValue) ? attributeValue.join(', ') : attributeValue}`;
            targetElement.appendChild(entryElement);
        }

        appendAttribute(name, "Name", user.username);
        appendAttribute(role, "Role", user.role);
        appendAttribute(email, "Email", user.email);

    } else {
        document.getElementById("userName").textContent = `Name: `;
        document.getElementById("userRole").textContent = `Role: `;
        document.getElementById("userEmail").textContent = `Email:`;
    }
}


// Display Project Data
const projectsList = document.getElementById("projects-list");

function displayProjects(projects) {
    projectsList.innerHTML = ''; // Clear the list before displaying

    projects.forEach((project, index) => {
        var projectContainer = document.createElement("div");
        projectContainer.classList.add("project");

        for (const [key, value] of Object.entries(project)) {
            var entryElement = document.createElement('p');
            entryElement.textContent = `${key}: ${Array.isArray(value) ? value.join(', ') : value}`;
            projectContainer.appendChild(entryElement);
        }

        addEditDeleteButtons(projectContainer, index);

        projectsList.appendChild(projectContainer);
    });
}

// Array to store project data
const projectDataArray = projectData.project;
displayProjects(projectDataArray);
console.count("file reloaded");


// Add New Project by getting form id's
const projectForm = document.getElementById("project-form");
const addProjectForm = document.getElementById("add-project-form");
const editProjectForm = document.getElementById("edit-project-form");

const addProjectBtn = document.getElementById("add-project");
const cancelAddBtn = document.getElementById("cancel-add");

addProjectBtn.addEventListener("click", () => {
    addProjectForm.classList.remove("hidden");
    editProjectForm.classList.add("hidden");
});

projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectName = document.getElementById("projectName").value;
    const projectDescription = document.getElementById("description").value;
    const projectDate = document.getElementById("date").value;
    const projectFramework = document.getElementById("framework").value;
    const projectLanguage = document.getElementById("languages").value;
    const projectTags = document.getElementById("tags").value;

    if (projectName && projectDescription && projectDate && projectFramework && projectLanguage && projectTags) {
        const newProject = {
            Title: projectName,
            Description: projectDescription,
            Date: projectDate,
            Technology: projectFramework,
            Languages: projectLanguage,
            Tags: projectTags

        };

        // Create a new project container for the newly added project
        const newProjectContainer = document.createElement("div");
        newProjectContainer.classList.add("project");

        for (const [key, value] of Object.entries(newProject)) {
            const entryElement = document.createElement('p');
            entryElement.textContent = `${key}: ${Array.isArray(value) ? value.join(', ') : value}`;
            newProjectContainer.appendChild(entryElement);
        }

        addEditDeleteButtons(newProjectContainer, projectDataArray.length);

        projectsList.appendChild(newProjectContainer);

        // Add the new project to the projectDataArray
        projectDataArray.push(newProject);

        addProjectForm.classList.remove("hidden");
        projectForm.reset();
    }

});


// Function to add Edit and Delete buttons to a project
function addEditDeleteButtons(projectContainer, projectIndex) {

    const editBtn = document.createElement("button");
    editBtn.classList.add('update-button');
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
        addProjectForm.classList.add("hidden");
        openEditForm(projectIndex);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add('update-button');
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        deleteProject(projectIndex);
    });

    projectContainer.appendChild(editBtn);
    projectContainer.appendChild(deleteBtn);
}


// Function to open the Edit form with existing user data
function openEditForm(projectIndex) {
    const editForm = document.getElementById("edit-project-form");
    editForm.innerHTML = ""; // Clear previous content

    const project = projectDataArray[projectIndex];
    for (const [key, value] of Object.entries(project)) {
        const label = document.createElement("label");
        label.textContent = key;
        const input = document.createElement("input");
        input.value = value;
        input.setAttribute("name", key); // Set the name attribute to match the project data key
        editForm.appendChild(label);
        editForm.appendChild(input);
    }

    const saveEditBtn = document.createElement("button");
    saveEditBtn.classList.add('update-button');
    saveEditBtn.textContent = "Save";
    saveEditBtn.addEventListener("click", () => {
        saveEditProject(projectIndex);
    });

    const closeBtn = document.createElement("button");
    closeBtn.classList.add('update-button');
    closeBtn.textContent = "Close";
    closeBtn.addEventListener("click", () => {
        closeEditForm();
    });

    editForm.appendChild(saveEditBtn);
    editForm.appendChild(closeBtn); // Add the Close button
    editProjectForm.classList.remove("hidden");
}


// Function to save edited project data
function saveEditProject(projectIndex) {
    const projectToUpdate = projectDataArray[projectIndex];
    const inputElements = editProjectForm.querySelectorAll('input');

    // Loop through the input elements and update the Project data
    inputElements.forEach(input => {
        const key = input.getAttribute("name");
        const value = input.value;
        projectToUpdate[key] = value;
    });

    // projectDataArray[projectIndex] = projectToUpdate;
    console.log("Project update", projectToUpdate);
    console.log("Index", projectDataArray[projectIndex]);

    editProjectForm.classList.remove("hidden");

    displayProjects(projectDataArray);
}


// Function to close the current edit form
function closeEditForm() {
    editProjectForm.classList.add("hidden");
}

// Function to Cancel a form
cancelAddBtn.addEventListener("click", () => {
    projectForm.reset();
    addProjectForm.classList.add("hidden");
});

// Function to delete a project
function deleteProject(projectIndex) {
    projectDataArray.splice(projectIndex, 1);
    displayProjects(projectDataArray);
}


//Search Project
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', filterProjects);

function filterProjects() {
    const searchText = searchInput.value.toLowerCase();
    const filteredProjects = projectData.project.filter(project => {

        const technologyMatch = project['Technology'] && (
            Array.isArray(project['Technology'])
                ? project['Technology'].some(tech => tech.toLowerCase().includes(searchText))
                : project['Technology'].toLowerCase().includes(searchText)
        );
        const languagesMatch = project['Languages'] && (
            Array.isArray(project['Languages'])
                ? project['Languages'].some(lang => lang.toLowerCase().includes(searchText))
                : project['Languages'].toLowerCase().includes(searchText)
        );
        const tagsMatch = project['Tags'] && (
            Array.isArray(project['Tags'])
                ? project['Tags'].some(tag => tag.toLowerCase().includes(searchText))
                : project['Tags'].toLowerCase().includes(searchText)
        );

        return technologyMatch || languagesMatch || tagsMatch;
    });
    displayProjects(filteredProjects);
}

//keyword suggestions in the datalist element
const keywordSuggestions = document.getElementById('keyword-suggestions');
const allTags = projectData.project.flatMap(project => project.Tags || []);
const uniqueTags = [...new Set(allTags)];
uniqueTags.forEach(tag => {
    const option = document.createElement('option');
    option.value = tag;
    keywordSuggestions.appendChild(option);
});
//=============================================================


// Experience
const expContainer = document.getElementById('exp-container');
projectData.experience.forEach(experience => {
    const experienceDiv = document.createElement('div');
    experienceDiv.classList.add('experience');

    for (const [key, value] of Object.entries(experience)) {
        const entryElement = document.createElement('p');
        entryElement.textContent = `${key}: ${Array.isArray(value) ? value.join(', ') : value}`;
        experienceDiv.appendChild(entryElement);
    }

    expContainer.appendChild(experienceDiv);
});
//=============================================================


// Education
const eduContainer = document.getElementById('edu-container');
// Loop over the projectData and generate HTML
projectData.education.forEach(education => {
    const eduDiv = document.createElement('div');
    eduDiv.classList.add('experience');

    for (const [key, value] of Object.entries(education)) {
        const entryElement = document.createElement('p');
        entryElement.textContent = `${key}: ${Array.isArray(value) ? value.join(', ') : value}`;
        eduDiv.appendChild(entryElement);
    }

    eduContainer.appendChild(eduDiv);
});
// =======================================================


// Skills
const skillContainer = document.getElementById('skill-container');
projectData.skills.forEach(skills => {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('skills');

    const skillElement = document.createElement('h3');
    skillElement.textContent = skills;

    projectDiv.appendChild(skillElement);
    skillContainer.appendChild(projectDiv);
});
// =======================================================
//Another Section
