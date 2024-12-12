const gallery = document.querySelectorAll(".gallery img");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const close = document.getElementById("close");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let currentIndex = 0;

function openModal(index) {
  modal.style.display = "flex";
  modalImage.src = gallery[index].src;
  currentIndex = index;
}

function closeModal() {
  modal.style.display = "none";
}

function showPrev() {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : gallery.length - 1;
  modalImage.src = gallery[currentIndex].src;
}

function showNext() {
  currentIndex = currentIndex < gallery.length - 1 ? currentIndex + 1 : 0;
  modalImage.src = gallery[currentIndex].src;
}

gallery.forEach((img, index) => {
  img.addEventListener("click", () => openModal(index));
});

close.addEventListener("click", closeModal);
prev.addEventListener("click", showPrev);
next.addEventListener("click", showNext);

window.addEventListener("keydown", (e) => {
  if (modal.style.display === "flex") {
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "Escape") closeModal();
  }
});

