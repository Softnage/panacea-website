document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".whiskey-cards")) {
    // Slider dragging
    const slider = document.querySelector(".whiskey-cards");
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      cancelMomentumTracking();
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
      beginMomentumTracking();
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX; //scroll-fast
      var prevScrollLeft = slider.scrollLeft;
      slider.scrollLeft = scrollLeft - walk;
      velX = slider.scrollLeft - prevScrollLeft;
    });

    // Momentum
    var velX = 0;
    var momentumID;

    slider.addEventListener("wheel", (e) => {
      cancelMomentumTracking();
    });

    function beginMomentumTracking() {
      cancelMomentumTracking();
      momentumID = requestAnimationFrame(momentumLoop);
    }

    function cancelMomentumTracking() {
      cancelAnimationFrame(momentumID);
    }

    function momentumLoop() {
      slider.scrollLeft += velX * 2;
      velX *= 0.95;
      if (Math.abs(velX) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop);
      }
    }

    // Scroll
    const scrollContainer = document.querySelector(".whiskey-cards");

    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();

      window.requestAnimationFrame(() => {
        scrollContainer.scrollTo({
          top: 0,
          left: scrollContainer.scrollLeft + evt.deltaY * 2,
          behavior: "smooth",
        });
      });
    });

    // Auto Navigation
    const itemWidth = slider.querySelector(".whiskey-card").offsetWidth;
    const numItems = slider.querySelectorAll(".whiskey-card").length;
    let currentIndex = 0;
    const autoNavigationInterval = 2000; // Adjust interval as needed

    function navigateToNextItem() {
      currentIndex = (currentIndex + 1) % numItems;
      slider.scrollTo({ left: currentIndex * itemWidth, behavior: "smooth" });
    }

    function navigateToPreviousItem() {
      currentIndex = (currentIndex - 1 + numItems) % numItems;
      slider.scrollTo({ left: currentIndex * itemWidth, behavior: "smooth" });
    }

    let autoNavigationTimer = setInterval(
      navigateToNextItem,
      autoNavigationInterval
    );

    slider.addEventListener("mouseover", () => {
      clearInterval(autoNavigationTimer);
    });

    slider.addEventListener("mouseout", () => {
      autoNavigationTimer = setInterval(
        navigateToNextItem,
        autoNavigationInterval
      );
    });
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

const observing = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show1");
    } else {
      entry.target.classList.remove("show1");
    }
  });
});

const hiddenElement = document.querySelectorAll(".hidden1");
hiddenElement.forEach((el) => observing.observe(el));

class Slider {
  constructor(slider) {
    this.slider = slider;
    this.display = slider.querySelector(".image-display");
    this.navButtons = Array.from(slider.querySelectorAll(".nav-button"));
    this.prevButton = slider.querySelector(".prev-button");
    this.nextButton = slider.querySelector(".next-button");
    this.sliderNavigation = slider.querySelector(".slider-navigation");
    this.currentSlideIndex = 0;
    this.preloadedImages = {};

    this.initialize();
  }

  initialize() {
    this.setupSlider();
    this.preloadImages();
    this.eventListeners();
  }

  setupSlider() {
    this.showSlide(this.currentSlideIndex);
  }

  showSlide(index) {
    this.currentSlideIndex = index;
    const navButtonImg =
      this.navButtons[this.currentSlideIndex].querySelector("img");
    if (navButtonImg) {
      const imgClone = navButtonImg.cloneNode();
      this.display.replaceChildren(imgClone);
    }
    this.updateNavButtons();
  }

  updateNavButtons() {
    this.navButtons.forEach((button, buttonIndex) => {
      const isSelected = buttonIndex === this.currentSlideIndex;
      button.setAttribute("aria-selected", isSelected);
      if (isSelected) button.focus();
    });
  }

  preloadImages() {
    this.navButtons.forEach((button) => {
      const imgElement = button.querySelector("img");
      if (imgElement) {
        const imgSrc = imgElement.src;
        if (!this.preloadedImages[imgSrc]) {
          this.preloadedImages[imgSrc] = new Image();
          this.preloadedImages[imgSrc].src = imgSrc;
        }
      }
    });
  }

  eventListeners() {
    document.addEventListener("keydown", (event) => {
      this.handleAction(event.key);
    });

    this.sliderNavigation.addEventListener("click", (event) => {
      const targetButton = event.target.closest(".nav-button");
      const index = targetButton ? this.navButtons.indexOf(targetButton) : -1;
      if (index !== -1) {
        this.showSlide(index);
      }
    });

    this.prevButton.addEventListener("click", () => this.handleAction("prev"));
    this.nextButton.addEventListener("click", () => this.handleAction("next"));
  }

  handleAction(action) {
    if (action === "Home") {
      this.currentSlideIndex = 0;
    } else if (action === "End") {
      this.currentSlideIndex = this.navButtons.length - 1;
    } else if (action === "ArrowRight" || action === "next") {
      this.currentSlideIndex =
        (this.currentSlideIndex + 1) % this.navButtons.length;
    } else if (action === "ArrowLeft" || action === "prev") {
      this.currentSlideIndex =
        (this.currentSlideIndex - 1 + this.navButtons.length) %
        this.navButtons.length;
    }

    this.showSlide(this.currentSlideIndex);
  }
}

const ImageSlider = new Slider(document.querySelector(".image-slider"));

const inputs = document.querySelector("input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if ((this.calue = "")) {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});



