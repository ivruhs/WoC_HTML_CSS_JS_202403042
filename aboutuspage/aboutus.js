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

// logout function hoga wapas index.html wale page pe jaane ke liye
function logout() {
  // Remove karo logged-in user ko localStorage se
  localStorage.removeItem("loggedInUser");

  // Go back to the sign-in page
  window.location.href = "index.html";
}

////////////////////////// about us //////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const circImage = document.querySelector(".about img");

  circImage.addEventListener("mouseover", () => {
    circImage.style.boxShadow = "0 0 40px #f0f";
  });

  circImage.addEventListener("mouseout", () => {
    circImage.style.boxShadow = "0 0 25px #0ff";
  });
});

////////////////////////// unstoppable uduemy ////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  // Function to update counter
  const updateCounterForCard1 = (max, element) => {
    let counter = 0;

    const updateCounter = () => {
      counter = (counter + 1) % (max + 1);
      element.textContent = `${counter}+`;

      if (counter === 300) {
        setTimeout(updateCounter, 5000); // loop ke baad 5s ka break
      } else {
        setTimeout(updateCounter, 20);
      }
    };

    updateCounter();
  };
  const updateCounterForCard2 = (max, element) => {
    let counter = 0;

    const updateCounter = () => {
      counter = (counter + 1) % (max + 1);
      element.textContent = `${counter}+`;

      if (counter === 10) {
        setTimeout(updateCounter, 5000); // loop ke baad 5s ka break
      } else {
        setTimeout(updateCounter, 600);
      }
    };

    updateCounter();
  };
  const updateCounterForCard3 = (max, element) => {
    let counter = 0;

    const updateCounter = () => {
      counter = (counter + 1) % (max + 1);
      element.textContent = `${counter}+`;

      if (counter === 50) {
        setTimeout(updateCounter, 5000); // loop ke baad 5s ka break
      } else {
        setTimeout(updateCounter, 120);
      }
    };

    updateCounter();
  };

  // Card 1
  const card1Element = document.querySelector(".card:nth-child(1) .text");
  if (card1Element) {
    updateCounterForCard1(300, card1Element);
  }

  // Card 2
  const card2Element = document.querySelector(".card:nth-child(2) .text");
  if (card2Element) {
    updateCounterForCard2(10, card2Element);
  }

  // Card 3
  const card3Element = document.querySelector(".card:nth-child(3) .text");
  if (card3Element) {
    updateCounterForCard3(50, card3Element);
  }
});
