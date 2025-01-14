// logout function to go back to index.html
function logout() {
  // Remove the logged-in user from localStorage
  localStorage.removeItem("loggedInUser");

  // Redirect to the sign-in page
  window.location.href = "index.html";
}

/**********************************************************************************************************/

//navigation bar code

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

// MAIN CODE FOR THE COURSES

//inaugration of courses

const courses = [
  {
    id: 1,
    title: "Web Development",
    description: "Learn HTML, CSS, and JavaScript.",
    price: 200,
    enrolled: false,
    progress: 0,
  },
  {
    id: 2,
    title: "Video Editing",
    description: "Get started with wonders of video editing.",
    price: 250,
    enrolled: false,
    progress: 0,
  },
  {
    id: 3,
    title: "Introduction to Data Analytics",
    description: "Learn the basics of Data Analytics.",
    price: 0, // Free
    enrolled: false,
    progress: 0,
  },
  {
    id: 4,
    title: "AI / ML A to Z",
    description: "Become an ML expert through hands-on projects.",
    price: 400,
    enrolled: false,
    progress: 0,
  },
  {
    id: 5,
    title: "Database Management",
    description: "Basics of Data Handling and Data Management.",
    price: 150,
    enrolled: false,
    progress: 0,
  },
  {
    id: 6,
    title: "Cyber Security",
    description: "Master cyber security strategies.",
    price: 350,
    enrolled: false,
    progress: 0,
  },
  {
    id: 7,
    title: "Ethical Hacking",
    description: "Start your Hacking journey here.",
    price: 0, // Free
    enrolled: false,
    progress: 0,
  },
  {
    id: 8,
    title: "Cloud Computing Basics",
    description: "Learn the fundamentals of cloud services.",
    price: 300,
    enrolled: false,
    progress: 0,
  },
  {
    id: 9,
    title: "Graphic Designing",
    description: "Introduction to the principles of Graphic Designing.",
    price: 220,
    enrolled: false,
    progress: 0,
  },
];

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
// getting back the logged in user
let userProgress = JSON.parse(localStorage.getItem("userProgress")) || {};
// getting back userProgress if user's data is already stored, else initialize his progress

if (!userProgress[loggedInUser.email]) {
  userProgress[loggedInUser.email] = {
    walletAmount: 1000,
    coursesEnrolled: 0,
    courses: courses.map((course) => ({
      id: course.id,
      enrolled: false,
      progress: 0,
    })),
  };
  localStorage.setItem("userProgress", JSON.stringify(userProgress));
}

// users data will be stored, walletbalance, no. of courses enrolled and in which courses user is enrolled
// PROGRESS is for the SUBTOPICS' progress

let {
  walletAmount,
  coursesEnrolled,
  courses: userCourses,
} = userProgress[loggedInUser.email];

// userProgress -->object
// email --> key
// destructuring is done so that we can use direct variables such
// as wallet amount instead of " userProgress[loggedInUser.email].walletAmount "

function updateLocalStorage() {
  userProgress[loggedInUser.email] = {
    walletAmount,
    coursesEnrolled,
    courses: userCourses,
  };
  localStorage.setItem("userProgress", JSON.stringify(userProgress));
}

// now this updateLocalStorage function is important bcoz it updates the data in the
// local storage whenever a user buys a course

function updateWallet() {
  document.getElementById("wallet-amount").innerText = walletAmount;
  document.getElementById("courses-enrolled").innerText = coursesEnrolled;
}

// this function is to update the wallet balance and courses enrolled on the screen
// ensuring that the UI reflects real-time changes

function displayCourses(coursesToDisplay) {
  const courseContainer = document.getElementById("course-container");
  courseContainer.innerHTML = "";
  coursesToDisplay.forEach((course) => {
    const userCourse = userCourses.find((uc) => uc.id === course.id);
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <p>${course.price} <i class="fas fa-coins"></i></p>
      ${
        userCourse.enrolled
          ? `<button class="enrolled-button">Enrolled</button>
             <button onclick="openCourse(${course.id})">Open Course</button>`
          : `<button onclick="buyCourse(${course.id})">Buy</button>`
      }
    `;
    courseContainer.appendChild(card);
  });
}

// a very imp function, it displays the cards of our courses
// how? it dynamically created a div and adds a class card to it and changes its HTML
// it adds content to it according to the courses array
// moreover, there's a ternary function too, it works like this that the const UserCourse , .find and that whole line basically
// checks if an enrolled course's id (userCourse has that) matches with the current id of the courses array
// if it matches, then show enrolled and open course button, else show Buy button

function buyCourse(courseId) {
  const userCourse = userCourses.find((uc) => uc.id === courseId);
  const course = courses.find((c) => c.id === courseId);
  let courseInput = confirm("Do you want to proceed?");
  if (courseInput) {
    if (walletAmount >= course.price) {
      walletAmount -= course.price;
      coursesEnrolled += 1;
      userCourse.enrolled = true;
      updateWallet();
      displayCourses(courses);
      updateLocalStorage();
    } else {
      alert("Not enough coins!");
    }
  }
}

// as the name suggests, this function is for buying courses
// userCourse refer to course data which is specific to the logged in user
// course refers to the general courses array
// what happens here is that line 1 of the function, retrieves the user's enrollment data for the course he is trying to buy, so that if he buys, we
// can mark userCourse.enrolled = true
// similarly line 2 is used for retrieving the general course data such as price

function openCourse(courseId) {
  const course = courses.find((c) => c.id === courseId);
  const userCourse = userCourses.find((uc) => uc.id === courseId);
  document.getElementById("modal-heading").innerText = course.title;
  document.getElementById("modal-description").innerText = course.description;
  document.getElementById("modal-price").innerText = course.price;
  document
    .getElementById("modal-heading")
    .setAttribute("data-course-id", courseId);

  showSubtopics(userCourse);
  document.getElementById("course-modal").style.display = "block";
}

// see the first line of code is to find the course information from the general courses array
// which is used in the modal-container to set title, description, and price
// the second line of code is imp coz it conatins user-specific info such has progress and enrollment status
// the set attribute line adds an extra info i.e. courseId, being stored as the value of the data-course-id attribute.
// it basically helps me to reference the course later when needed.

function showSubtopics(userCourse) {
  const subtopicsList = document.getElementById("subtopics-list");
  subtopicsList.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `subtopic-${i}`;
    checkbox.checked = i < userCourse.progress;
    checkbox.disabled = i > userCourse.progress;

    // sequential ticking of checkboxes ko ensure karne ke liye tha ye code
    // suppose progress = 2, yaani first 2 checboxes will be ticked, therefore 0,1,2 will be ticked
    // and i>2 will be disabled, i.e. 3 and 4 numbered checkboxes will be disabled.

    checkbox.onclick = () => {
      if (checkbox.checked && i === userCourse.progress) {
        userCourse.progress++;
      } else if (!checkbox.checked && i === userCourse.progress - 1) {
        userCourse.progress--;
      }
      updateProgress(userCourse); // to update the progress bar accordingly
      updateLocalStorage();
      showSubtopics(userCourse); // recursion
    };

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.innerText = `Subtopic ${i + 1}`;

    // to display Subtopic i+1 next to the checkbox

    subtopicsList.appendChild(checkbox);
    subtopicsList.appendChild(label);
    subtopicsList.appendChild(document.createElement("br"));
  }

  const progressBar = document.getElementById("progress");
  progressBar.style.width = "0%";

  document.getElementById("reset-progress").onclick = resetProgress;

  // to reset the progress

  updateLocalStorage();
  updateProgress(userCourse);
}

function updateProgress(userCourse) {
  const progressBar = document.getElementById("progress");
  const progressText = document.getElementById("progress-text");

  const percentage = (userCourse.progress / 5) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerText =
    userCourse.progress === 5
      ? "Congratulations 🎉, course completed ✨"
      : `${userCourse.progress}/5 topics completed`;
}

// function to update the text and the progress bar acc to the progress made in the subtopics

function resetProgress() {
  const checkboxes = document.querySelectorAll(
    '#subtopics-list input[type="checkbox"]'
  );

  //** document.querySelectorAll() to find all <input> elements of type checkbox within the
  // #subtopics-list element. **//

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.disabled = checkbox.id !== "subtopic-0"; // Only the first checkbox will be enabled
  });

  const courseId = parseInt(
    document.getElementById("modal-heading").getAttribute("data-course-id"),
    10
  );

  // this line of code is to retrieve the courseId of the course whose progress
  // is being reser, parseInt is to conver string to int

  const userCourse = userCourses.find((uc) => uc.id === courseId);

  if (userCourse) {
    userCourse.progress = 0; // Reset progress
    updateProgress(userCourse);
    updateLocalStorage(); // Save the changes
  }

  // mark the progress of that specific course id to be zero
  // and save it in local storage
}

//*************Comments pending from here************//

document.getElementById("close-modal").onclick = function () {
  document.getElementById("course-modal").style.display = "none";
};

document.getElementById("search").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(query)
  );
  displayCourses(filteredCourses);
});

document.getElementById("sort-options").addEventListener("change", (e) => {
  let sortedCourses = [...courses];
  switch (e.target.value) {
    case "low":
      sortedCourses.sort((a, b) => a.price - b.price);
      break;
    case "high":
      sortedCourses.sort((a, b) => b.price - a.price);
      break;
    case "az":
      sortedCourses.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "za":
      sortedCourses.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }
  displayCourses(sortedCourses);
});

document.getElementById("course-type").addEventListener("change", (e) => {
  const type = e.target.value;
  let filteredCourses = [];

  if (type === "free") {
    filteredCourses = courses.filter((course) => course.price === 0);
  } else if (type === "paid") {
    filteredCourses = courses.filter((course) => course.price > 0);
  } else {
    filteredCourses = courses;
  }
  displayCourses(filteredCourses);
});

displayCourses(courses);
updateWallet();

//local storage

// {
//   "userProgress": {
//     "user@example.com": {
//       "walletAmount": 1000,
//       "coursesEnrolled": 0,
//       "courses": [
//         {
//           "id": 1,
//           "enrolled": false,
//           "progress": 0
//         },
//         {
//           "id": 2,
//           "enrolled": false,
//           "progress": 0
//         },
//         {
//           "id": 3,
//           "enrolled": false,
//           "progress": 0
//         },
//         {
//           "id": 4,
//           "enrolled": false,
//           "progress": 0
//         },
//         {
//           "id": 5,
//           "enrolled": false,
//           "progress": 0
//         },
//         {
//           "id": 6,
//           "enrolled": false,
//           "progress": 0
//         }
//       ]
//     }
//   }
// }
