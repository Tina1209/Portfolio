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


   document.querySelectorAll(".image-wrapper").forEach((wrapper) => {
     let imageUrl = wrapper.getAttribute("data-image");
     wrapper.style.backgroundImage = `url(${imageUrl})`;
   });
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
  let lastScrollY = window.scrollY; // Запам'ятовуємо початкову позицію

  document.addEventListener("scroll", () => {
    let portfolioSection = document.querySelector(".scrolling-container");
    if (!portfolioSection) return;

    let scrollY = window.scrollY;
    let isMobile = window.innerWidth <= 768;
    let deltaY = scrollY - lastScrollY; // Зміна положення прокрутки
    lastScrollY = scrollY; // Оновлюємо останню позицію

    document.querySelectorAll(".scrolling-container .column").forEach((col) => {
      let wrapper = col.querySelector(".image-wrapper");
      if (wrapper) {
        let direction =
          parseFloat(col.style.getPropertyValue("--direction")) || 1;
        let speed = isMobile ? 0.1 : 0.3;

        // Визначаємо поточний translateY
        let currentY = parseFloat(wrapper.dataset.offset) || 0;

        // Плавний рух без стрибків
        let newY = currentY + deltaY * speed * direction;

        // Зберігаємо нове значення
        wrapper.dataset.offset = newY;
        wrapper.style.transform = `translateY(${newY}px)`;
      }
    });
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
  const containerRect = bubbleContainer.getBoundingClientRect();
  const bubbles = [];

  // Create bubbles with original positioning
  for (let i = 0; i < 25; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    const size = Math.random() * 60 + 30;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Position bubbles as in original code
    const x = Math.random() * containerRect.width;
    const y = Math.random() * containerRect.height;

    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;

    // Store position and velocity in dataset
    bubble.dataset.posX = x;
    bubble.dataset.posY = y;
    bubble.dataset.velX = (Math.random() - 0.5) * 4;
    bubble.dataset.velY = (Math.random() - 0.5) * 4;

    bubbleContainer.appendChild(bubble);
    bubbles.push(bubble);
  }

  let isHovered = false;

  function moveBubbles() {
    bubbles.forEach((bubble) => {
      if (!isHovered) {
        const bubbleSize = parseFloat(bubble.style.width);
        let x = parseFloat(bubble.dataset.posX);
        let y = parseFloat(bubble.dataset.posY);
        let velX = parseFloat(bubble.dataset.velX);
        let velY = parseFloat(bubble.dataset.velY);

        // Update position with original speed factor but more controlled
        x += velX * 10;
        y += velY * 10;

        // Strict boundary checking (including bubble size)
        const maxX = containerRect.width - bubbleSize;
        const maxY = containerRect.height - bubbleSize;

        // Check if hitting boundaries and reverse direction
        if (x <= 0 || x >= maxX) {
          velX *= -1;
          // Keep bubble within boundaries
          x = Math.max(0, Math.min(x, maxX));
        }

        if (y <= 0 || y >= maxY) {
          velY *= -1;
          // Keep bubble within boundaries
          y = Math.max(0, Math.min(y, maxY));
        }

        // Update stored values
        bubble.dataset.posX = x;
        bubble.dataset.posY = y;
        bubble.dataset.velX = velX;
        bubble.dataset.velY = velY;

        // Use transform for better performance, keeping original transition
        bubble.style.transition = "transform 3s linear";
        bubble.style.transform = `translate(${
          x - parseFloat(bubble.style.left)
        }px, ${y - parseFloat(bubble.style.top)}px)`;
      }
    });

    // Use setTimeout as in original code
    setTimeout(moveBubbles, 400);
  }

  // Start the animation
  moveBubbles();

  // Handle hover interactions (unchanged from original)
  document.querySelectorAll(".contact-link").forEach((link) => {
    link.addEventListener("mouseenter", () => {
      isHovered = true;
      bubbles.forEach((bubble) => {
        bubble.classList.add("hovered");
        bubble.style.transition = "opacity 0.8s ease-out";
        bubble.style.opacity = "0.1";
      });
      link.style.background = "radial-gradient(circle, #ffb700, #ff6a00)";
    });

    link.addEventListener("mouseleave", () => {
      isHovered = false;
      bubbles.forEach((bubble) => {
        bubble.classList.remove("hovered");
        bubble.style.transition = "opacity 0.5s ease-in";
        bubble.style.opacity = "0.8";
      });
      link.style.background = "rgba(201, 201, 201, 0.2)";
    });
  });
}