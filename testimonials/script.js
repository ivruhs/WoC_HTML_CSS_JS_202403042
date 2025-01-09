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

const USER_KEY = "userReview"; // key for storing all reviews in localStorage

// logged-in user ko laao
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

// check kar ki user ne pehle se review to nai diya na
function checkReviewStatus() {
  const storedReviews = JSON.parse(localStorage.getItem(USER_KEY)) || {};

  // check ki logged-in user ka email, stored reviews me hain ya nai
  if (loggedInUser.email && storedReviews[loggedInUser.email]) {
    addReviewButton.disabled = true;
    addReviewButton.textContent = "Review Submitted";

    // user ka review dynamically slider me insert karo
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

// show the review form
addReviewButton.addEventListener("click", () => {
  formContainer.style.display = "block";
  formContainer.scrollIntoView({ behavior: "smooth" });
  element.style.height = "100%";
});

// for adding new review
reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const stars = document.getElementById("stars").value;
  const message = document.getElementById("message").value.trim();

  const storedReviews = JSON.parse(localStorage.getItem(USER_KEY)) || {};

  // check kar ki user ne pehle se review to nai daal rakha
  if (loggedInUser.email && storedReviews[loggedInUser.email]) {
    alert("You have already submitted a review.");
    formContainer.style.display = "none";
    reviewForm.reset();
    return;
  }

  // new review ko save karo
  const userReview = { name, stars, message };
  storedReviews[loggedInUser.email] = userReview;
  localStorage.setItem(USER_KEY, JSON.stringify(storedReviews));

  // add new review as a form of slide
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

  // update the form and button states
  formContainer.style.display = "none";
  reviewForm.reset();
  addReviewButton.disabled = true;
  addReviewButton.textContent = "Review Submitted";

  alert("Thank you for submitting your review!");
  element.style.height = "100vh";
});

// close the review form
const closeBtn = document.getElementsByClassName("close")[0];
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.style.display = "none";
  reviewForm.reset();
  element.style.height = "100vh";
});
