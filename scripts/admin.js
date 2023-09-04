import projectData from '../data/profileData.json' assert { type: "json" };
import userData from '../data/users.json' assert { type: "json" };

// Display Users from JSON file
const userContainer = document.getElementById('user-container');
userData.viewUsers.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user');

    for (const [key, value] of Object.entries(user)) {
        const entryElement = document.createElement('p');
        entryElement.textContent = `${key}: ${Array.isArray(value) ? value.join(', ') : value}`;
        userDiv.appendChild(entryElement);
    }
    userContainer.appendChild(userDiv);
});

// Add New User
const UserList = document.getElementById("user-list");
const addUserBtn = document.getElementById("add-user");
// Array to store user data
const userDataArray = [];
addUserBtn.addEventListener("click", () => {
    var userName = prompt("Enter Name:");
    var userEmail = prompt("Enter Email:");
    var role = prompt("Enter Role:");
    var number = prompt("Enter Number: ");
    if (userName) {
        const newUser = {
            Title: userName,
            Email: userEmail,
            Role: role,
            Number: number,
        };
        userDataArray.push(newUser);
        displayUser(userDataArray);
    }
});

// Display Projects After new Add
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

// Function to add Edit and Delete buttons to a project
function addEditDeleteButtons(userContainer, userIndex) {
    const editBtn = document.createElement("button");
    editBtn.classList.add('update-button');
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
        const updatedName = prompt("Enter updated Name:");
        const updatedEmail = prompt("Enter updated Email:");
        const updatedRole = prompt("Enter updated Role:");
        const updatedNumber = prompt('Enter new Number');

        if (updatedName !== null) {
            userDataArray[userIndex].Title = updatedName;
        }
        if (updatedEmail !== null) {
            userDataArray[userIndex].Email = updatedEmail;
        }
        if (updatedRole !== null) {
            userDataArray[userIndex].Role = updatedRole;
        }
        if (updatedNumber !== null) {
            userDataArray[userIndex].Number = updatedNumber;
        }
        if (updatedName === null && updatedEmail === null && updatedRole === null && updatedNumber === null) {
            alert("No updates were made.");
        }

        displayUser(userDataArray);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add('update-button');
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        userDataArray.splice(userIndex, 1);
        displayUser(userDataArray);
    });

    userContainer.appendChild(editBtn);
    userContainer.appendChild(deleteBtn);
}

//Search User
const searchInput = document.getElementById('searchUser');
const searchButton = document.getElementById('searchUserBtn');
searchButton.addEventListener('click', filterUsers);
function filterUsers() {
    const searchText = searchInput.value.toLowerCase();
    const filteredUsers = userData.viewUsers.filter(viewUsers => {

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
const usernames = userData.viewUsers.flatMap(user => user.username);
const emails = userData.viewUsers.flatMap(user => user.email);
const numbers = userData.viewUsers.flatMap(user => user.number);

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
