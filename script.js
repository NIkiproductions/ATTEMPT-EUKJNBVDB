const screens = {
  start: document.getElementById("screen-start"),
  yes: document.getElementById("screen-yes"),
  town: document.getElementById("screen-town"),
};

const noButton = document.getElementById("no-button");
const yesButton = document.getElementById("yes-button");
const enterButton = document.getElementById("enter-button");
const messages = [
  "Are you sure?",
  "Very sure?",
  "Reconsider?",
  "Are you sure sure?",
  "You know you want to say yes...",
  "Stop lying.",
  "Flip you!",
];

let noClickCount = 0;

const moveNoButton = () => {
  const card = screens.start.querySelector(".card");
  const cardRect = card.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();

  const maxX = cardRect.width - buttonRect.width - 20;
  const maxY = cardRect.height - buttonRect.height - 20;

  const randomX = Math.max(0, Math.min(maxX, Math.random() * maxX));
  const randomY = Math.max(0, Math.min(maxY, Math.random() * maxY));

  noButton.style.position = "absolute";
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
};

const updateNoButtonText = () => {
  const message = messages[noClickCount % messages.length];
  noButton.textContent = message;
};

const growYesButton = () => {
  const scale = 1 + Math.min(noClickCount, 6) * 0.08;
  yesButton.style.transform = `scale(${scale})`;
};

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("click", (event) => {
  event.preventDefault();
  noClickCount += 1;
  updateNoButtonText();
  moveNoButton();
  growYesButton();
});

yesButton.addEventListener("click", () => {
  screens.start.classList.remove("screen--active");
  screens.yes.classList.add("screen--active");
});

enterButton.addEventListener("click", () => {
  screens.yes.classList.remove("screen--active");
  screens.town.classList.add("screen--active");
});

const track = document.getElementById("carousel-track");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let index = 0;

const updateCarousel = () => {
  const items = track.children;
  const itemWidth = items[0].getBoundingClientRect().width + 18;
  track.style.transform = `translateX(${-index * itemWidth}px)`;
};

prev.addEventListener("click", () => {
  index = Math.max(0, index - 1);
  updateCarousel();
});

next.addEventListener("click", () => {
  index = Math.min(track.children.length - 1, index + 1);
  updateCarousel();
});

window.addEventListener("resize", updateCarousel);
updateCarousel();
