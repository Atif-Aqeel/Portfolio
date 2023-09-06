import usersData from '../data/users.json' assert { type: "json" };

document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    signupForm?.addEventListener("submit", signup);

    // Initialize usersData if it's empty or doesn't exist
    if (!usersData.users) {
        usersData.users = [];
    }

    //Signup Function
    function signup(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const number = document.getElementById("phone").value;

        const existingUser = usersData.users.find(user => user.email === email);
        if (existingUser) {
            alert(email + " already registered. ");
            return;
        }
        var newUser = {
            username: username,
            email: email,
            password: password,
            number: number
        };
        usersData.users.push(newUser);

        alert(username + " Thanks for registration.");
        window.location.href = "/userLogin.html";
    }

});


document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", login);

    // Login Function
    function login(event) {
        event.preventDefault();
        const userEmail = document.getElementById("email").value;
        const userPassword = document.getElementById("password").value;

        const existUser = usersData.users.find(user => user.email === userEmail && user.password === userPassword.toString());
        if (existUser) {

            // localStorage.setItem("userEmail", "abc@gmail.com");
            // localStorage.setItem("userEmail", usersData.users.email);
            localStorage.setItem("userEmail", existUser.email);

            alert("Login Successful!");

            // Check user's role and redirect accordingly
            if (existUser.role === "admin") {
                window.location.href = "/admin.html";
            } else if (existUser.role === "user") {
                window.location.href = "/userProfile.html";
            }

        }
        else {
            alert("Login Failed, Invalid Email and Password");
            return;
        }
    }

});

// window.onload = function () {
//     localStorage.removeItem("userId");
//     localStorage.removeItem("userRole");
// };
