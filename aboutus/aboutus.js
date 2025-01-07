// about us

document.addEventListener("DOMContentLoaded", () => {
  const circularImage = document.querySelector(".about img");

  circularImage.addEventListener("mouseover", () => {
    circularImage.style.boxShadow = "0 0 40px #f0f";
  });

  circularImage.addEventListener("mouseout", () => {
    circularImage.style.boxShadow = "0 0 25px #0ff";
  });
});

// unstoppable

document.addEventListener("DOMContentLoaded", () => {
  // Function to update the counter for a single card
  const updateCounterForCard1 = (max, element) => {
    let counter = 0;

    const updateCounter = () => {
      counter = (counter + 1) % (max + 1);
      element.textContent = `${counter}+`;

      if (counter === 300) {
        setTimeout(updateCounter, 10000); // Pause for 5 seconds after a loop
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
        setTimeout(updateCounter, 10000); // Pause for 5 seconds after a loop
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
        setTimeout(updateCounter, 10000); // Pause for 5 seconds after a loop
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
