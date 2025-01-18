// getting back/retrieving the logged-in user from localStorage
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
  // greet user with his name
  document.getElementById(
    "greeting"
  ).textContent = `Welcome to Udemy, ${loggedInUser.name}!`;
} else {
  // Redirect to sign-in page if no user logged in
  alert("No user logged in. Redirecting to Sign In.");
  window.location.href = "index.html";
}

// logout function to go back to index.html page
function logout() {
  // Remove the logged-in user from localStorage
  localStorage.removeItem("loggedInUser");

  // Redirect to the sign-in page
  window.location.href = "index.html";
}

/**********************************************************************************************************/

//navigation bar js code

const navbarLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenBtn = document.querySelector("#menu-open-button");
const menuCloseBtn = document.querySelector("#menu-close-button");

menuOpenBtn.addEventListener("click", () => {
  // Toggle mobile menu visibility
  document.body.classList.toggle("show-mobile-menu");
});

// Close menu when close button is clicked
menuCloseBtn.addEventListener("click", () => menuOpenBtn.click());

// Close menu when nav link is clicked
navbarLinks.forEach((link) => {
  link.addEventListener("click", () => menuOpenBtn.click());
});

/**********************************************************************************************************/

// Progress Bar Script
// const circle = document.querySelector(".progress-container");
// let progress = 0;

// function updateProgress() {
//   progress += 1;
//   if (progress > 100) progress = 0;

//   // Update CSS variable for the progress
//   circle.style.setProperty("--progress", `${progress}%`);
// }

// setInterval(updateProgress, 50); // Adjust speed as needed

// Progress Bar Script
const circle = document.querySelector(".progress-container");
const progressText = document.querySelector(".progress-text");
let progress = 0;

function updateProgress() {
  progress += 1;
  if (progress > 100) progress = 0;

  // Update CSS variable for the progress
  circle.style.setProperty("--progress", `${progress}%`);

  // Dynamically update the progress text
  progressText.innerHTML = `${progress}+<br />Students`;
}

// Call updateProgress every 50ms
setInterval(updateProgress, 50);

/**********************************************************************************************************/

// OUR COURSE & OUR TUTORS ke slider ka script

const swiper = new Swiper(".slider-wrapper", {
  loop: true,
  grabCursor: true,
  spaceBetween: 30,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    620: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// ("use strict");

// function typeWriter(el) {
//   const textArray = el.innerHTML.split("");
//   el.innerHTML = "";
//   textArray.forEach((letter, i) =>
//     setTimeout(() => (el.innerHTML += letter), 200 * i)
//   );

//   setInterval(() => typeWriter(el), 8000);
// }

// typeWriter(elementEl);
