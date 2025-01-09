//////////////////// navbar ke liye js ////////////////////////////////

const navbarLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenBtn = document.querySelector("#menu-open-button");
const menuCloseBtn = document.querySelector("#menu-close-button");

menuOpenBtn.addEventListener("click", () => {
  // Toggle mobile menu
  document.body.classList.toggle("show-mobile-menu");
});

// Close menu when close button dabaya ho
menuCloseBtn.addEventListener("click", () => menuOpenBtn.click());

// Close menu when nav link dabaya ho
navbarLinks.forEach((link) => {
  link.addEventListener("click", () => menuOpenBtn.click());
});

////////////////////////// logout function ////////////////////////////////////

// logout function to navigate back to index.html
function logout() {
  // Remove logged-in user from localStorage
  localStorage.removeItem("loggedInUser");

  // Redirect to the sign-in page
  window.location.href = "index.html";
}

// Initialize Swiper
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// DOM Elements
const addReviewButton = document.getElementById("addReview");
const formContainer = document.getElementById("formContainer");
const reviewForm = document.getElementById("reviewForm");
const element = document.getElementById("testimonial_container");

const USER_KEY = "userReview"; // Key for storing all reviews in localStorage

// Get the logged-in user
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

// Check if user has already submitted a review
function checkReviewStatus() {
  const storedReviews = JSON.parse(localStorage.getItem(USER_KEY)) || {};

  // Check if the logged-in user's email is in the stored reviews
  if (loggedInUser.email && storedReviews[loggedInUser.email]) {
    addReviewButton.disabled = true;
    addReviewButton.textContent = "Review Submitted";

    // Load the user's review into the Swiper
    const userReview = storedReviews[loggedInUser.email];
    const newSlide = document.createElement("div");
    newSlide.classList.add("swiper-slide", "slide");
    newSlide.innerHTML = `
        <img src="images/udemy_logo.webp" alt="" class="image" />
        <h3>${userReview.name}</h3>
        <div class="stars">${"★".repeat(userReview.stars)}${"☆".repeat(
      5 - userReview.stars
    )}</div>
        <i class="bx bxs-quote-alt-left quote-icon"></i>
        <p>${userReview.message}</p>
      `;
    swiper.appendSlide(newSlide);
    swiper.update();
  }
}

checkReviewStatus();

// Show the review form
addReviewButton.addEventListener("click", () => {
  formContainer.style.display = "block";
  formContainer.scrollIntoView({ behavior: "smooth" });
  element.style.height = "100%";
});

// Add a new review
reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const stars = document.getElementById("stars").value;
  const message = document.getElementById("message").value.trim();

  const storedReviews = JSON.parse(localStorage.getItem(USER_KEY)) || {};

  // Check if the user already submitted a review
  if (loggedInUser.email && storedReviews[loggedInUser.email]) {
    alert("You have already submitted a review.");
    formContainer.style.display = "none";
    reviewForm.reset();
    return;
  }

  // Save the new review
  const userReview = { name, stars, message };
  storedReviews[loggedInUser.email] = userReview;
  localStorage.setItem(USER_KEY, JSON.stringify(storedReviews));

  // Add the new review as a slide
  const newSlide = document.createElement("div");
  newSlide.classList.add("swiper-slide", "slide");
  newSlide.innerHTML = `
      <img src="images/udemy_logo.webp" alt="" class="image" />
      <h3>${name}</h3>
      <div class="stars">${"★".repeat(stars)}${"☆".repeat(5 - stars)}</div>
      <i class="bx bxs-quote-alt-left quote-icon"></i>
      <p>${message}</p>
    `;
  swiper.appendSlide(newSlide);
  swiper.update();

  // Update the form and button states
  formContainer.style.display = "none";
  reviewForm.reset();
  addReviewButton.disabled = true;
  addReviewButton.textContent = "Review Submitted";

  alert("Thank you for submitting your review!");
  element.style.height = "100vh";
});

// Close the review form
const closeBtn = document.getElementsByClassName("close")[0];
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.style.display = "none";
  reviewForm.reset();
  element.style.height = "100vh";
});
