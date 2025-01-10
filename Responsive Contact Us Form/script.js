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

//////////

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const formContainer = document.getElementById("form-container");
  const thankYouContainer = document.getElementById("thank-you-container");
  const enquiryButton = document.getElementById("enquiry-button");

  // Handle form submission
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formContainer.classList.add("hidden");
    thankYouContainer.classList.remove("hidden");
  });

  // Handle Enquiry button click
  enquiryButton.addEventListener("click", () => {
    contactForm.reset(); // Reset the form fields
    thankYouContainer.classList.add("hidden");
    formContainer.classList.remove("hidden");
  });
});

// logout function hoga wapas index.html wale page pe jaane ke liye
function logout() {
  // Remove the logged-in user from localStorage
  localStorage.removeItem("loggedInUser");

  // Redirect to the sign-in page
  window.location.href = "index.html";
}

/**********************************************************************************************************/
