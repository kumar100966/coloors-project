// Selectors

const saveButton = document.querySelector("button.save");
const modals = document.querySelectorAll(".modal");
const saveModal = modals[0];
const copiedModal = modals[1];
const exitButtons = document.querySelectorAll(".close");
const saveModalExitButton = exitButtons[0];
const closeModalExitButton = exitButtons[1];
const paletteHeaders = document.querySelectorAll(".hex-value");

// Event Listeners

saveButton.addEventListener("click", function (event) {
  toggleModal(saveModal);
});

saveModalExitButton.addEventListener("click", function (event) {
  toggleModal(saveModal);
});

paletteHeaders.forEach((paletteHeader) => addListenertoHeader(paletteHeader));
closeModalExitButton.addEventListener("click", function (event) {
  toggleModal(copiedModal);
});

// Functions

function addListenertoHeader(paletteHeader) {
  paletteHeader.addEventListener("click", function () {
    toggleModal(copiedModal);
  });
}

function toggleModal(modal) {
  modal.classList.toggle("modal-active");
  modal.parentElement.classList.toggle("modal-container-active");
}
