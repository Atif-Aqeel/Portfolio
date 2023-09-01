import usersData from '../data/users.json' assert { type: "json" };

document.addEventListener("DOMContentLoaded", function (event) {
    var signupForm = document.getElementById("signup-form");
    signupForm.addEventListener("submit", signup);
    var loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", login);

    //Signup Function
    function signup() {
        event.preventDefault();
        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var number = document.getElementById("number").value;

        var existingUser = usersData.users.find(user => user.email === email);
        if (existingUser) {
            alert(email + " is already registered. ");
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
        window.location.href = "/userProfile.html";
    }

    // Login Function
    function login() {
        event.preventDefault();
        var userEmail = document.getElementById("email").value;
        var userPassword = document.getElementById("password").value;

        var existUser = usersData.users.find(user => user.email === userEmail);
        if (!existUser) {
            alert("Email does not exist.");
            return;
        }
        if (existUser.password !== userPassword) {
            alert("Password does not match.");
            return;
        }
        alert(existUser.email + " You are logged in. Welcome to our website.");
        window.location.href = "userProfile.html";
    }

});