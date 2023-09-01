import projects from '../data/profileData.json' assert { type: "json" };

// Get the project container
const projectContainer = document.getElementById("projectContainer");

// 3. Show only the first 3 lines of the description with … while listing.
// truncate function that display 3 lines just
function truncateDescription(description) {
    const maxLines = 3;
    const lines = description.split('\n');
    if (lines.length > maxLines) {
        const truncatedLines = lines.slice(0, maxLines);
        return truncatedLines.join('\n') + '...';
    }
    return description;
}

// 2. Project listing should read data(saved at frontend) and list them dynamically in HTML.
function createProjectListing(project) {
    const projectListing = document.createElement("section");
    projectListing.className = "flex-container-project";

    console.log(truncateDescription(project.description));

    const projectHTML = `
        <div class="flex-item-right">
        <blockquote >
            <h3 class="title">${project.title}</h3>
            
            <p class="projects-para">${truncateDescription(project.description)}</p>
            <button class="button projectButton" title="View Details">View Details</button>
        </blockquote>
        </div>
        <div class="flex-item-left">
            <img src="${project.image}" alt="${project.title}" class="project-img">
        </div>
        <hr class="hr-project">
    `;

    projectListing.innerHTML = projectHTML;
    projectContainer.appendChild(projectListing);

    const detailsButton = projectListing.querySelector(".button");
    detailsButton.addEventListener("click", () => {
        openModal(project);
    });
}
// Create project listings
projects.portfolioProjects.forEach(createProjectListing);


// 4. On clicking on a project, open the project in a new modal(popover) 
// with the image first, then the title, and then the description.
// Open Model When CLick 
function openModal(project) {
    const modal = document.getElementById("projectModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");

    modalImage.src = project.image;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    modal.style.display = "block";
}
// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (event) => {
    const modal = document.getElementById("projectModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
// =================================================================

// 1. Scroll to About Section on Button Click:
const scrollButton = document.getElementById('scrollButton');
scrollButton.addEventListener('click', function () {
    document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
});

// 4. WhatsApp and Email Links:
const whatsappButton = document.getElementById('whatsappButton');
const emailButton = document.getElementById('emailButton');
whatsappButton.addEventListener('click', function () {
    window.open('https://wa.me/03091144185', '_blank');
});
emailButton.addEventListener('click', function () {
    window.location.href = 'mailto:your-email@example.com';
});


//Logout
// const logoutButton = document.getElementById("logoutBtn");
// logoutButton.addEventListener("click", function () {
//     alert("You have been logged out!");
//     window.location.href = "/userLogin.html";
// });

