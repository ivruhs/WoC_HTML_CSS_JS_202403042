//////////////////// js code for navbar ////////////////////////////////

const navbarLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenBtn = document.querySelector("#menu-open-button");
const menuCloseBtn = document.querySelector("#menu-close-button");

menuOpenBtn.addEventListener("click", () => {
  // Toggle mobile menu
  document.body.classList.toggle("show-mobile-menu");
});

// Close menu when close button is clicked
menuCloseBtn.addEventListener("click", () => menuOpenBtn.click());

// Close menu when nav link is clicked
navbarLinks.forEach((link) => {
  link.addEventListener("click", () => menuOpenBtn.click());
});

////////////////////////// logout function ////////////////////////////////////

// logout function is to go back to index.html page
function logout() {
  // Remove logged-in user from localStorage
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
        setTimeout(updateCounter, 5000); // 5s break after the loop
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
        setTimeout(updateCounter, 5000); // 5s break after the loop
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
        setTimeout(updateCounter, 5000); // 5s break after the loop
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

//chatbot ka code
// // courses array
const courses = [
  { name: "Web Development", price: 200 },
  { name: "Video Editing", price: 250 },
  { name: "Intro to Data Analytics", price: 0 },
  { name: "AI/ML -> A to Z", price: 400 },
  { name: "Database Management", price: 150 },
  { name: "Cyber Security", price: 350 },
  { name: "Ethical Hacking", price: 0 },
  { name: "Cloud Computing Basics", price: 300 },
  { name: "Graphic Designing", price: 220 },
];

// acessing the DOM elements
const chatbotButton = document.getElementById("chatbot-button"); // to open the chatbot interface
const chatbotInterface = document.getElementById("chatbot-interface"); // entire chatbot containing container
const closeChat = document.getElementById("close-chat"); // used to close the chatbot
const resetBtn = document.getElementById("reset-btn"); // to reset the chatbot conversation and show the course list again
const chatMessages = document.getElementById("chatbot-messages"); // container showing the messages of bot (IvRuHs) and user
let courseSelected = false; // tracking whether the course is selected or not, by default all courses are unselected at first

// opening the chatbot container and initialising the chat, when the button is clicked

chatbotInterface.style.display = "none"; // Hide the chatbot initially

chatbotButton.addEventListener("click", () => {
  chatbotInterface.style.display = "flex";
  startChat();
});

// closing the container when close button is clicked (cross symbol)

closeChat.addEventListener("click", () => {
  chatbotInterface.style.display = "none";
});

// marking all the courses to false and initialising the chat again

resetBtn.addEventListener("click", () => {
  courseSelected = false;
  startChat();
});

// fetching data from local storage

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

// function to initialise the chat with a greeting message and displaying the courses

function startChat() {
  chatMessages.innerHTML = "";
  displayMessage(
    `Hey there, @ ${loggedInUser.name} 👋! Myself IvRuHs!  Here are the available courses. Click on a course to proceed.`,
    "bot"
  );
  displayCourses();
}

// to display the messages in the chatbot's interface
// message will be the string, i.e. greeting,course details, etc
// sender will either be bot or the user, according to sender apply the class (line-59)
function displayMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "bot" ? "bot-message" : "user-message";
  messageDiv.textContent = message;
  chatMessages.appendChild(messageDiv);

  // Scroll the scrollable container (#chatbot-body) to the bottom
  setTimeout(() => {
    const chatBody = document.getElementById("chatbot-body");
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 0);
}

// to display the list of courses that the user can choose from
function displayCourses() {
  const courseList = document.createElement("ul");
  courseList.className = "course-list";
  courses.forEach((course) => {
    const listItem = document.createElement("li");
    listItem.textContent = course.name;
    listItem.addEventListener("click", () => {
      if (!courseSelected) {
        // checking if any other course isn't selected
        handleCourseSelection(course); // function to handle further actions based on the selected course
        courseSelected = true;
      }
    });
    courseList.appendChild(listItem); // appending the listItem (each course)
  });
  chatMessages.appendChild(courseList); // appending the final courseList
}

// reconfirmation about the selection of user

function handleCourseSelection(course) {
  displayMessage(
    `Are you sure you want to know more about "${course.name}"?`,
    "bot"
  );
  displayYesNoButtons(course);
}

//

function displayYesNoButtons(course) {
  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button-group"; // giving class name for styling purposes

  const yesButton = document.createElement("button");
  yesButton.className = "response-button";
  yesButton.textContent = "Yes";
  yesButton.addEventListener("click", () => {
    yesButton.disabled = true; // once yes button is clicked, user cannot press yes or no button again
    noButton.disabled = true;

    displayMessage(
      `${course.name} costs ${course.price} coins. Do you want more info?`,
      "bot"
    );
    // if yes button is pressed, throw some light on the price and ask yes/no question
    displayInfoButtons(); // yes/no buttons for info
  });

  const noButton = document.createElement("button");
  noButton.className = "response-button";
  noButton.textContent = "No";
  noButton.addEventListener("click", () => {
    yesButton.disabled = true; // once no button is clicked, user cannot press yes or no button again
    noButton.disabled = true;
    courseSelected = false;
    displayMessage("Okay! Here's the course list again.", "bot");
    displayCourses(); // if no is pressed, show the courses list again for user to choose some other course
  });

  buttonGroup.appendChild(yesButton); // appending the buttons to the buttonGroup
  buttonGroup.appendChild(noButton);
  chatMessages.appendChild(buttonGroup); // appending the buttonGroup to main interface (chatMessages)
}

function displayInfoButtons() {
  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button-group"; // giving class name for styling purposes

  const yesButton = document.createElement("button");
  yesButton.className = "response-button";
  yesButton.textContent = "Yes";
  yesButton.addEventListener("click", () => {
    yesButton.disabled = true; // once yes button is clicked, user cannot press yes or no button again
    noButton.disabled = true;
    displayMessage(
      "You can contact us at M: 9998258453 for further info. Thank you!",
      "bot"
    ); // calling the display message function, sending message as string and setting sender as bot
  });

  const noButton = document.createElement("button");
  noButton.className = "response-button";
  noButton.textContent = "No";
  noButton.addEventListener("click", () => {
    yesButton.disabled = true; // once no button is clicked, user cannot press yes or no button again
    noButton.disabled = true;
    displayMessage("Thank you for chatting with us. Have a nice day!", "bot");
  });

  buttonGroup.appendChild(yesButton); // appending the buttons to the buttonGroup
  buttonGroup.appendChild(noButton);
  chatMessages.appendChild(buttonGroup); // appending the buttonGroup to main interface (chatMessages)
}
