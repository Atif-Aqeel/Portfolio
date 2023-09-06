import projectData from '../data/profileData.json' assert { type: "json" };
import userData from '../data/users.json' assert { type: "json" };
// location.href = "http://127.0.0.1:5500/userLogin.html";

window.onload = function () {
    userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
        localStorage.removeItem("userEmail");
        location.href = "http://127.0.0.1:5500/userLogin.html";
    }

};


// Display Users from JSON file
const userContainer = document.getElementById('user-container');
userData.users.forEach((user, index) => {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user');

    for (const [key, value] of Object.entries(user)) {
        const entryElement = document.createElement('p');
        entryElement.textContent = `${key}: ${Array.isArray(value) ? value.join(', ') : value}`;
        userDiv.appendChild(entryElement);
    }

    addEditDeleteButtons(userDiv, index);

    userContainer.appendChild(userDiv);
});

// Display User After new Add
const UserList = document.getElementById("user-list");
function displayUser(users) {
    UserList.innerHTML = ''; // Clear the list before displaying
    users.forEach((user, index) => {
        var userContainer = document.createElement("div");
        userContainer.classList.add("userClass");

        for (const [key, value] of Object.entries(user)) {
            var entryElement = document.createElement('p');
            entryElement.textContent = `${key}: ${Array.isArray(value) ? value.join(', ') : value}`;
            userContainer.appendChild(entryElement);
        }

        addEditDeleteButtons(userContainer, index);

        UserList.appendChild(userContainer);
    });
}

// Add New User
const userDataArray = [];
const userForm = document.getElementById("user-form");
const addUserForm = document.getElementById("add-user-form");
const editUserForm = document.getElementById("edit-user-form");

const addUserBtn = document.getElementById("add-user");
const cancelAddBtn = document.getElementById("cancel-add");

addUserBtn.addEventListener("click", () => {
    addUserForm.classList.remove("hidden");
    editUserForm.classList.add("hidden");
});

userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("userEmail").value;
    const userRole = document.getElementById("userRole").value;
    const userNumber = document.getElementById("userNumber").value;

    if (userName && userEmail && userRole && userNumber) {
        const newUser = {
            Title: userName,
            Email: userEmail,
            Role: userRole,
            Number: userNumber,
        };
        userDataArray.push(newUser);
        displayUser(userDataArray);

        addUserForm.classList.remove("hidden");
        userForm.reset();
    }
});

// Function to add Edit and Delete buttons to a project
function addEditDeleteButtons(userContainer, userIndex) {

    const editBtn = document.createElement("button");
    editBtn.classList.add('update-button');
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
        addUserForm.classList.add("hidden");
        openEditForm(userIndex);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add('update-button');
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        deleteUser(userIndex);
    });

    userContainer.appendChild(editBtn);
    userContainer.appendChild(deleteBtn);
}

// Function to open the Edit form with existing user data
function openEditForm(userIndex) {
    const editForm = document.getElementById("edit-user-form");
    editForm.innerHTML = ""; // Clear previous content

    const user = userDataArray[userIndex];
    for (const [key, value] of Object.entries(user)) {
        const label = document.createElement("label");
        label.textContent = key;
        const input = document.createElement("input");
        input.value = value;
        input.setAttribute("name", key); // Set the name attribute to match the user data key
        editForm.appendChild(label);
        editForm.appendChild(input);
    }

    const saveEditBtn = document.createElement("button");
    saveEditBtn.classList.add('update-button');
    saveEditBtn.textContent = "Save";
    saveEditBtn.addEventListener("click", () => {
        saveEditUser(userIndex);
    });

    const closeBtn = document.createElement("button");
    closeBtn.classList.add('update-button');
    closeBtn.textContent = "Close";
    closeBtn.addEventListener("click", () => {
        closeEditForm();
    });

    editForm.appendChild(saveEditBtn);
    editForm.appendChild(closeBtn); // Add the Close button
    editUserForm.classList.remove("hidden");
}

// Function to save edited user data
function saveEditUser(userIndex) {
    // Get the user data to be updated
    const userToUpdate = userDataArray[userIndex];

    // Get all the input elements inside the editUserForm
    const inputElements = editUserForm.querySelectorAll('input');

    // Loop through the input elements and update the user data
    inputElements.forEach(input => {
        const key = input.getAttribute("name");
        const value = input.value;
        userToUpdate[key] = value;
    });

    // Update the user data in the array
    userDataArray[userIndex] = userToUpdate;

    editUserForm.classList.remove("hidden");
    displayUser(userDataArray);
}

// Function to close the current edit form
function closeEditForm() {
    editUserForm.classList.add("hidden");
}

// Function to Cancel a form
cancelAddBtn.addEventListener("click", () => {
    addUserForm.classList.remove("hidden");
    userForm.reset();

});

// Function to delete a user
function deleteUser(userIndex) {
    userDataArray.splice(userIndex, 1);
    displayUser(userDataArray);
}



//Search User
const searchInput = document.getElementById('searchUser');
const searchButton = document.getElementById('searchUserBtn');
searchButton.addEventListener('click', filterUsers);
function filterUsers() {
    const searchText = searchInput.value.toLowerCase();
    const filteredUsers = userData.users.filter(viewUsers => {

        const nameMatch = viewUsers['username'] && (
            Array.isArray(viewUsers['username'])
                ? viewUsers['username'].some(name => name.toLowerCase().includes(searchText))
                : viewUsers['username'].toLowerCase().includes(searchText)
        );
        const emailMatch = viewUsers['email'] && (
            Array.isArray(viewUsers['email'])
                ? viewUsers['email'].some(mail => mail.toLowerCase().includes(searchText))
                : viewUsers['email'].toLowerCase().includes(searchText)
        );
        const numberMatch = viewUsers['number'] && (
            Array.isArray(viewUsers['number'])
                ? viewUsers['number'].some(num => num.toLowerCase().includes(searchText))
                : viewUsers['number'].toLowerCase().includes(searchText)
        );

        return nameMatch || emailMatch || numberMatch;
    });
    displayUser(filteredUsers);
}

//keyword suggestions in the datalist element
const keywordSuggestions = document.getElementById('keyword-suggestions-user');
const usernames = userData.users.flatMap(user => user.username);
const emails = userData.users.flatMap(user => user.email);
const numbers = userData.users.flatMap(user => user.number);

const uniqueSuggestions = [...new Set([...usernames, ...emails, ...numbers])];
uniqueSuggestions.forEach(suggestions => {
    const option = document.createElement('option');
    option.value = suggestions;
    keywordSuggestions.appendChild(option);
});

// =========================================================


//Portfolio
// Get the portfolio container
const portfolioContainer = document.getElementById("portfolio-container");

function truncateDescription(description) {
    const maxLines = 3;
    const lines = description.split('\n');
    if (lines.length > maxLines) {
        const truncatedLines = lines.slice(0, maxLines);
        return truncatedLines.join('\n') + '...';
    }
    return description;
}

// portfolio listing dynamically 
function createPortfolioListing(portfolio) {
    const portfolioListing = document.createElement("section");
    portfolioListing.className = "portfolioListing";

    const portfolioHTML = `
        <div class="card">
            <img src="${portfolio.image}" alt="${portfolio.title}" class="cardImg">
            <h2 class="cardTitle">${portfolio.title}</h2>
            <p  class="cardPara">${truncateDescription(portfolio.description)}</p>
            <button class="button cardButton" >See Portfolio</button>
        </div>
    `;
    portfolioListing.innerHTML = portfolioHTML;
    portfolioContainer.appendChild(portfolioListing);

    const detailsButton = portfolioListing.querySelector(".button");
    detailsButton.addEventListener("click", () => {

        switch (true) {
            case portfolio.url === "/index.html":
                window.open(`${portfolio.url}`, '_blank').focus();
                break;
            default:
                openModal(portfolio);
                break;
        }
    });

}
// Create portfolio listings from projectData.json file
projectData.portfolioProjects.forEach(createPortfolioListing);


// Open Model When CLick 
function openModal(portfolio) {
    const modal = document.getElementById("projectModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");

    modalImage.src = portfolio.image;
    modalTitle.textContent = portfolio.title;
    modalDescription.textContent = portfolio.description;

    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (event) => {
    const modal = document.getElementById("projectModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// =========================================================

// Next Section
