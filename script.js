document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX - 7.5}px, ${
      e.clientY - 7.5
    }px)`;
  });
  navigation();
  scrollingPortfolio();
});

function navigation() {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const menuLinks = document.querySelectorAll(".nav-menu a");

  function closeMenu() {
    navMenu.classList.remove("open");
    menuToggle.classList.remove("open");
  }

  menuToggle.addEventListener("click", (event) => {
    navMenu.classList.toggle("open");
    menuToggle.classList.toggle("open");
    event.stopPropagation();
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });
}

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

const list = document.querySelector(".certificates-list");
const items = document.querySelectorAll(".certificate-img");
const wrapper = document.querySelector(".certificates-wrapper");

let scrollAmount = 0;
const maxScroll = items.length * 320 - wrapper.offsetWidth;

document.querySelector(".next").addEventListener("click", () => {
  if (scrollAmount < maxScroll) {
    scrollAmount += 200;
    if (scrollAmount > maxScroll) scrollAmount = maxScroll;
    list.style.transform = `translateX(-${scrollAmount}px)`;
  }
});

document.querySelector(".prev").addEventListener("click", () => {
  if (scrollAmount > 0) {
    scrollAmount -= 200;
    if (scrollAmount < 0) scrollAmount = 0;
    list.style.transform = `translateX(-${scrollAmount}px)`;
  }
});

// Відкриття модального вікна
document.querySelectorAll(".certificate-img").forEach((img) => {
  img.addEventListener("click", function () {
    document.getElementById("modal").style.display = "block";
    document.getElementById("modal-img").src = this.src;
  });
});

document.getElementById("modal").addEventListener("click", function (event) {
  if (event.target === this) {
    this.style.display = "none";
  }
});

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

    if (offset === 0) {
      item.classList.add("center");
    } else if (offset === 1) {
      item.classList.add("right-1");
    } else if (offset === 2) {
      item.classList.add("right-2");
    } else if (offset === total - 1) {
      item.classList.add("left-1");
    } else if (offset === total - 2) {
      item.classList.add("left-2");
    } else {
      item.classList.add("hidden");
    }
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

magItems.forEach((item) => {
  item.addEventListener("click", function () {
    if (this.classList.contains("center")) {
      document.getElementById("mag-modal").style.display = "flex";
      document.getElementById("mag-modal-img").src = this.src;
    }
  });
});

document
  .getElementById("mag-modal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      this.style.display = "none";
    }
  });

magUpdateCarousel();


document.querySelectorAll(".fashion-gallery-item").forEach((item) => {
  item.addEventListener("click", function () {
    document.getElementById("fashion-modal").style.display = "flex";
    document.getElementById("fashion-modal-img").src = this.src;
  });
});

document
  .getElementById("fashion-modal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      this.style.display = "none";
    }
  });