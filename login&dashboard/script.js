// Show/Hide Forms
document.getElementById("showSignIn").addEventListener("click", () => {
  document.getElementById("sign-up-form").classList.remove("active");
  document.getElementById("sign-in-form").classList.add("active");
});

document.getElementById("showSignUp").addEventListener("click", () => {
  document.getElementById("sign-in-form").classList.remove("active");
  document.getElementById("sign-up-form").classList.add("active");
});

// Sign-Up Form Handling
document.getElementById("signUpForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !username || !email || !password) {
    alert("Please fill in all fields!");
    return;
  }

  // Retrieve existing users from localStorage
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  // Check if the email is already registered
  if (users.some((user) => user.email === email)) {
    alert("Email is already registered!");
    return;
  }

  // Add new user to array
  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Sign-Up Successful! You can now sign in.");
  document.getElementById("name").value = "";
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("showSignIn").click(); // Switch to Sign-In Form
});

// Sign-In Form Handling
document.getElementById("signInForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("All fields are required!");
    return;
  }

  // Retrieve users from localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Find the user
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    // Save the logged-in user details
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Sign-In Successful!");
    window.location.href = "dashboard.html"; // Redirect to dashboard
  } else {
    alert("Invalid email or password!");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("name").value = "";
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";
});
