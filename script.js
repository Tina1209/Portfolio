document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".cursor");

  function updateCursorVisibility() {
    if (window.innerWidth >= 991) {
      cursor.style.display = "block";
    } else {
      cursor.style.display = "none";
    }
  }

  document.addEventListener("mousemove", (e) => {
    if (window.innerWidth >= 991) {
      cursor.style.transform = `translate(${e.clientX - 7.5}px, ${
        e.clientY - 7.5
      }px)`;
    }
  });

  updateCursorVisibility();
  window.addEventListener("resize", updateCursorVisibility);

  navigation();
  scrollingPortfolio();
  magUpdateCarousel();
  bubbles();
});

// 🔹 Навігація
function navigation() {
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");
  const navWrapper = document.getElementById("navWrapper");
  const navMenu = document.getElementById("navMenu");
  const menuLinks = document.querySelectorAll(".nav-menu a");
   const scrollBarWidth =
     window.innerWidth - document.documentElement.clientWidth; 
  function openMenu() {
    navWrapper.classList.add("open");
    menuToggle.classList.add("open");
    document.body.classList.add("no-scroll");

    document.body.style.paddingRight = `${scrollBarWidth}px`;
  }

  function closeMenu() {
    navWrapper.classList.remove("open");
    menuToggle.classList.remove("open");
    document.body.classList.remove("no-scroll");
    document.body.style.paddingRight = ""; 
  }

  // Відкриваємо/закриваємо меню при натисканні на бургер-кнопку
  navbar.addEventListener("click", (event) => {
    event.stopPropagation(); // Щоб не спрацювало клікання на фон
    if (navWrapper.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Закриваємо меню при кліку на посилання
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Закриваємо меню при натисканні на фон (обгортку)
  navWrapper.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target)) {
      closeMenu();
    }
  });

  // Закриваємо меню при натисканні клавіші Esc
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

// 🔹 Прокрутка до секцій
document.querySelectorAll(".scroll-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// 🔹 Акордеон
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", function () {
    const item = this.parentElement;
    const content = item.querySelector(".accordion-content");

    if (item.classList.contains("active")) {
      content.style.maxHeight = null;
      item.classList.remove("active");
    } else {
      document.querySelectorAll(".accordion-item").forEach((i) => {
        i.classList.remove("active");
        i.querySelector(".accordion-content").style.maxHeight = null;
      });

      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// 🔹 Горизонтальна прокрутка сертифікатів
const list = document.querySelector(".certificates-list");
const items = document.querySelectorAll(".certificate-img");
const wrapper = document.querySelector(".certificates-wrapper");

let scrollAmount = 0;
const maxScroll = items.length * 280 - wrapper.offsetWidth;

document.querySelector(".next").addEventListener("click", () => {
  if (scrollAmount < maxScroll) {
    scrollAmount += 360;
    if (scrollAmount > maxScroll) scrollAmount = maxScroll;
    list.style.transform = `translateX(-${scrollAmount}px)`;
  }
});

document.querySelector(".prev").addEventListener("click", () => {
  if (scrollAmount > 0) {
    scrollAmount -= 360;
    if (scrollAmount < 0) scrollAmount = 0;
    list.style.transform = `translateX(-${scrollAmount}px)`;
  }
});

// 🔹 Модальне вікно (Фіксація прокрутки)
let scrollPosition = 0;

function openModal(img, modalId, modalImgId) {
  const modal = document.getElementById(modalId);
  const modalImg = document.getElementById(modalImgId);
   const scrollBarWidth =
     window.innerWidth - document.documentElement.clientWidth; 
  if (modal && modalImg) {
    modal.style.display = "flex";
    modalImg.src = img.src;

    scrollPosition = window.scrollY;
    document.body.classList.add("no-scroll");
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";

    document.body.classList.remove("no-scroll");
    document.body.style.paddingRight = ""; 
    document.body.style.top = "";
    window.scrollTo(0, scrollPosition);
  }
}

// 🔹 Закриття модального вікна при кліку поза зображенням
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal(modal.id);
    }
  });
});

// 🔹 Запобігання закриттю при натисканні на зображення
document
  .querySelectorAll(".modal-img, .fashion-modal-img, .certificate-modal-img")
  .forEach((img) => {
    img.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });

// 🔹 Карусель (портфоліо)
function scrollingPortfolio() {
  document.addEventListener("scroll", () => {
    let portfolioSection = document.querySelector(".portfolio-section");
    if (!portfolioSection) return;

    let rect = portfolioSection.getBoundingClientRect();

    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      let scrollY = window.scrollY;
      let isMobile = window.innerWidth <= 768;

      document
        .querySelectorAll(".scrolling-container .column")
        .forEach((col) => {
          let wrapper = col.querySelector(".image-wrapper");
          if (wrapper) {
            let direction =
              parseFloat(col.style.getPropertyValue("--direction")) || 1;
            let speed = isMobile ? 0.1 : 0.3;
            let moveY = (scrollY * speed * direction) % wrapper.clientHeight;
            wrapper.style.transform = `translateY(${moveY}px)`;
          }
        });
    }
  });
}

// 🔹 Карусель (журнал)
let magIndex = 0;
const magItems = document.querySelectorAll(".mag-item");

function magUpdateCarousel() {
  const total = magItems.length;

  magItems.forEach((item, i) => {
    let offset = (i - magIndex + total) % total;

    item.classList.remove(
      "center",
      "left-1",
      "right-1",
      "left-2",
      "right-2",
      "hidden"
    );

    if (offset === 0) item.classList.add("center");
    else if (offset === 1) item.classList.add("right-1");
    else if (offset === 2) item.classList.add("right-2");
    else if (offset === total - 1) item.classList.add("left-1");
    else if (offset === total - 2) item.classList.add("left-2");
    else item.classList.add("hidden");
  });
}

function magNextSlide() {
  magIndex = (magIndex + 1) % magItems.length;
  magUpdateCarousel();
}

function magPrevSlide() {
  magIndex = (magIndex - 1 + magItems.length) % magItems.length;
  magUpdateCarousel();
}


function bubbles() {
  const bubbleContainer = document.querySelector(".bubbles-wrapper");

  // Створюємо кульки
  const bubbles = [];
  for (let i = 0; i < 25; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const size = Math.random() * 60 + 30; // Випадковий розмір від 30 до 90px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Випадкова початкова позиція
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    bubble.style.left = `${x}%`;
    bubble.style.top = `${y}%`;

    // Зберігаємо поточні координати для плавного повернення
    bubble.dataset.posX = 0;
    bubble.dataset.posY = 0;

    bubbleContainer.appendChild(bubble);
    bubbles.push(bubble);
  }

  let isHovered = false; // Перевірка, чи наведено на кнопку

  // Функція плавного хаотичного руху
  function moveBubbles() {
    bubbles.forEach((bubble) => {
      if (!isHovered) {
        const prevX = parseFloat(bubble.dataset.posX);
        const prevY = parseFloat(bubble.dataset.posY);

        const deltaX = (Math.random() - 0.5) * 200;
        const deltaY = (Math.random() - 0.5) * 200;

        const newX = prevX + deltaX;
        const newY = prevY + deltaY;

        // Оновлюємо координати для наступного руху
        bubble.dataset.posX = newX;
        bubble.dataset.posY = newY;

        bubble.style.transition = "transform 6s linear";
        bubble.style.transform = `translate(${newX}px, ${newY}px)`;
      }
    });

    setTimeout(moveBubbles, 1000);
  }

  // Запускаємо рух одразу
  moveBubbles();

  // Обробка подій наведення
  document.querySelectorAll(".contact-link").forEach((link) => {
    link.addEventListener("mouseenter", () => {
      isHovered = true;

      bubbles.forEach((bubble) => {
        bubble.classList.add("hovered");
        bubble.style.transition = "opacity 0.8s ease-out";
        bubble.style.opacity = "0.1";
      });

      // Додаємо градієнт до кнопки
      link.style.background = "radial-gradient(circle, #ffb700, #ff6a00)";
    });

    link.addEventListener("mouseleave", () => {
      isHovered = false;

      bubbles.forEach((bubble) => {
        bubble.classList.remove("hovered");

        // Відновлюємо прозорість
        bubble.style.transition = "opacity 0.5s ease-in";
        bubble.style.opacity = "0.8";

         link.style.background = "rgba(201, 201, 201, 0.2)";
      });
    });
  });
}