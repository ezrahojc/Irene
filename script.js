/*
  Quick personalization:
  - Change partnerName and fromName below.
  - Edit wishMessages, reasons, coupons, and the letter text in index.html.
  - Replace gallery placeholders in index.html with your own <img src="assets/photo-name.jpg" alt="..."> tags.
*/
const birthdaySite = {
  partnerName: "my sunflower",
  fromName: "me",
  wishMessages: [
    "May this year be soft with you, bright for you, and full of little reasons to smile.",
    "May your birthday feel like sunlight through curtains, warm hands, and your favorite dessert.",
    "May every heavy thing become lighter, every happy thing become louder, and every dream feel closer.",
    "May you always remember how deeply loved you are, especially in the tiny quiet moments.",
    "May this year bring you silly laughs, peaceful mornings, brave choices, and beautiful surprises.",
    "May you get flowers for no reason, kisses on your forehead, and joy that stays longer than expected.",
    "May today be as cute as your smile and as golden as every room becomes when you enter it.",
    "May your heart feel safe, your mind feel calm, and your world feel full of sunshine."
  ]
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function setTextForClass(className, value) {
  document.querySelectorAll(`.${className}`).forEach((node) => {
    node.textContent = value;
  });
}

function createFloatingPetal() {
  if (prefersReducedMotion) return;

  const layer = document.querySelector(".petal-layer");
  if (!layer) return;

  const petal = document.createElement("span");
  petal.className = "floating-petal";
  petal.style.setProperty("--left", `${randomBetween(-5, 100)}vw`);
  petal.style.setProperty("--drift", `${randomBetween(-18, 18)}vw`);
  petal.style.setProperty("--duration", `${randomBetween(7, 13)}s`);
  petal.style.setProperty("--rotate", `${randomBetween(-180, 180)}deg`);
  petal.style.setProperty("--size", `${randomBetween(9, 18)}px`);
  layer.appendChild(petal);
  petal.addEventListener("animationend", () => petal.remove());
}

function createConfetti(count = 42) {
  if (prefersReducedMotion) return;

  const layer = document.querySelector(".petal-layer");
  if (!layer) return;

  const colors = ["#f8c537", "#ffe58a", "#e79a24", "#9dbb72", "#ff9b9b", "#fff2c9"];
  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.setProperty("--left", `${randomBetween(8, 92)}vw`);
    piece.style.setProperty("--drift", `${randomBetween(-36, 36)}vw`);
    piece.style.setProperty("--duration", `${randomBetween(2.2, 5.2)}s`);
    piece.style.setProperty("--rotate", `${randomBetween(-220, 220)}deg`);
    piece.style.setProperty("--confetti-color", colors[Math.floor(Math.random() * colors.length)]);
    piece.style.width = `${randomBetween(6, 12)}px`;
    piece.style.height = `${randomBetween(8, 16)}px`;
    piece.style.borderRadius = Math.random() > 0.55 ? "50%" : "0.25rem";
    layer.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

function getFreshWish(currentText) {
  const available = birthdaySite.wishMessages.filter((message) => message !== currentText);
  return available[Math.floor(Math.random() * available.length)] || birthdaySite.wishMessages[0];
}

function plantFlower(leftPercent) {
  if (prefersReducedMotion) return;

  const garden = document.getElementById("gardenBed");
  if (!garden) return;

  const flowers = garden.querySelectorAll(".sprout-flower");
  if (flowers.length >= 20) {
    flowers[0].remove();
  }

  const flower = document.createElement("span");
  flower.className = "sprout-flower";
  flower.style.left = `${leftPercent ?? randomBetween(8, 92)}%`;
  flower.style.setProperty("--scale", randomBetween(0.72, 1.22).toFixed(2));
  flower.style.zIndex = String(Math.floor(randomBetween(2, 12)));
  flower.innerHTML = `
    <span class="stem" aria-hidden="true"></span>
    <span class="leaf" aria-hidden="true"></span>
    <span class="leaf right" aria-hidden="true"></span>
    <span class="head" aria-hidden="true"></span>
  `;
  garden.appendChild(flower);
}

function wireDialog() {
  const dialog = document.getElementById("letterDialog");
  const openButton = document.getElementById("openLetter");
  const closeButton = document.getElementById("closeLetter");

  if (!dialog || !openButton || !closeButton) return;

  openButton.addEventListener("click", () => {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    createConfetti(24);
  });

  closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    const dialogBox = dialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < dialogBox.left ||
      event.clientX > dialogBox.right ||
      event.clientY < dialogBox.top ||
      event.clientY > dialogBox.bottom;

    if (clickedOutside) dialog.close();
  });
}

function initializeBirthdaySite() {
  setTextForClass("js-partner-name", birthdaySite.partnerName);
  setTextForClass("js-from-name", birthdaySite.fromName);

  const curtain = document.getElementById("welcomeCurtain");
  const startButton = document.getElementById("startButton");
  const sunshineButton = document.getElementById("sunshineButton");
  const finalConfetti = document.getElementById("finalConfetti");
  const wishButton = document.getElementById("wishButton");
  const wishText = document.getElementById("wishText");
  const garden = document.getElementById("gardenBed");
  const growButton = document.getElementById("growButton");

  startButton?.addEventListener("click", () => {
    curtain?.classList.add("hidden");
    curtain?.setAttribute("aria-hidden", "true");
    createConfetti(60);
    for (let index = 0; index < 5; index += 1) {
      window.setTimeout(() => plantFlower(), index * 130);
    }
  });

  sunshineButton?.addEventListener("click", () => createConfetti(54));

  finalConfetti?.addEventListener("click", () => {
    createConfetti(90);
    for (let index = 0; index < 8; index += 1) {
      window.setTimeout(() => plantFlower(), index * 90);
    }
  });

  wishButton?.addEventListener("click", () => {
    if (!wishText) return;
    wishText.textContent = getFreshWish(wishText.textContent.trim());
    createConfetti(18);
  });

  growButton?.addEventListener("click", () => plantFlower());

  garden?.addEventListener("click", (event) => {
    const rect = garden.getBoundingClientRect();
    const left = ((event.clientX - rect.left) / rect.width) * 100;
    plantFlower(Math.max(6, Math.min(94, left)));
  });

  wireDialog();

  if (!prefersReducedMotion) {
    for (let index = 0; index < 14; index += 1) {
      window.setTimeout(createFloatingPetal, index * 260);
    }
    window.setInterval(createFloatingPetal, 950);
  }
}

document.addEventListener("DOMContentLoaded", initializeBirthdaySite);
