import projectData from '../data/profileData.json' assert { type: "json" };

const dataContainer = document.getElementById('data-container');
//Display The JSON Projects
projectData.project.forEach(project => {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');

    for (const [key, value] of Object.entries(project)) {
        const entryElement = document.createElement('p');
        entryElement.textContent = `${key}: ${Array.isArray(value) ? value.join(', ') : value}`;
        projectDiv.appendChild(entryElement);
    }
    dataContainer.appendChild(projectDiv);
});

// Display all projects
function displayProjects(projects) {
    projectsList.innerHTML = '';

    projects.forEach((project, index) => {
        var projectContainer = document.createElement("div");
        projectContainer.classList.add("project");

        var projectName2 = document.createElement("h3");
        projectName2.textContent = project.Title;

        var projectDescription2 = document.createElement("p");
        projectDescription2.textContent = project.Description;

        var projectDate2 = document.createElement("p");
        projectDate2.textContent = project.Date;

        var projectFramework2 = document.createElement("p");
        projectFramework2.textContent = project.Framework;

        var projectLanguage2 = document.createElement("p");
        projectLanguage2.textContent = project.Language;

        var projectTags2 = document.createElement("p");
        projectTags2.textContent = project.Tags;

        projectContainer.appendChild(projectName2);
        projectContainer.appendChild(projectDescription2);
        projectContainer.appendChild(projectDate2);
        projectContainer.appendChild(projectFramework2);
        projectContainer.appendChild(projectLanguage2);
        projectContainer.appendChild(projectTags2);

        addEditDeleteButtons(projectContainer, index);
        projectsList.appendChild(projectContainer);
    });
}

// Add Projects
const projectsList = document.getElementById("projects-list");
const addProjectBtn = document.getElementById("add-project");
const projectDataArray = [];    // Array to store project data

addProjectBtn.addEventListener("click", () => {
    var projectName = prompt("Enter project Name:");
    var projectDescription = prompt("Enter Description:");
    var projectDate = prompt("Enter Date:");
    var projectFramework = prompt("Enter FrameWork: ");
    var projectLanguage = prompt("Enter Languages: ");
    var projectTags = prompt("Enter Tags: ");

    const newProject = {
        Title: projectName,
        Description: projectDescription,
        Date: projectDate,
        Framework: projectFramework,
        Language: projectLanguage,
        Tags: projectTags
    };
    projectDataArray.push(newProject);

    displayProjects(projectDataArray);
});

// Function to add Edit and Delete buttons to a project
function addEditDeleteButtons(projectContainer, projectIndex) {
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
        const updatedName = prompt("Enter updated Name:");
        const updatedDesc = prompt("Enter updated Desc:");
        const updatedDate = prompt("Enter updated Date:");
        const updatedFramework = prompt('Enter new framework');
        const updatedLanguage = prompt('Enter new language');
        const updatedTags = prompt('Enter new tags');

        if (updatedName != null) {
            projectDataArray[projectIndex].Title = updatedName;
        }
        if (updatedDesc !== null) {
            projectDataArray[projectIndex].Description = updatedDesc;
        }
        if (updatedDate !== null) {
            projectDataArray[projectIndex].Date = updatedDate;
        }
        if (updatedFramework !== null) {
            projectDataArray[projectIndex].Framework = updatedFramework;
        }
        if (updatedLanguage !== null) {
            projectDataArray[projectIndex].Language = updatedLanguage;
        }
        if (updatedTags !== null) {
            projectDataArray[projectIndex].Tags = updatedTags;
        }
        if (updatedName === null && updatedDesc === null && updatedDate === null && updatedFramework === null && updatedLanguage === null && updatedTags === null) {
            alert("No updates were made.");
        }
        displayProjects(projectDataArray);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        projectDataArray.splice(projectIndex, 1);
        displayProjects(projectDataArray);
    });

    projectContainer.appendChild(editBtn);
    projectContainer.appendChild(deleteBtn);
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
