// Selectors

const saveButton = document.querySelector("button.save");
const modals = document.querySelectorAll(".modal");
const saveModal = modals[0];
const copiedModal = modals[1];
const exitButtons = document.querySelectorAll(".close");
const saveModalExitButton = exitButtons[0];
const copiedModalExitButton = exitButtons[1];
const libraryModalExitButton = exitButtons[2];
const libraryButton = document.querySelector("#library-button");
const paletteHeaders = document.querySelectorAll(".hex-value");
const colorPanelButtons = document.querySelectorAll("button.activate-panel");
const colorControlPanels = document.querySelectorAll(".color-control");
const closeColorPanelButtons = document.querySelectorAll(
  ".close-color-control"
);

// Event Listeners

saveButton.addEventListener("click", function (event) {
  toggleModal(saveModal);
});

saveModalExitButton.addEventListener("click", function (event) {
  toggleModal(saveModal);
});

paletteHeaders.forEach((paletteHeader) => addListenertoHeader(paletteHeader));
copiedModalExitButton.addEventListener("click", function (event) {
  toggleModal(copiedModal);
});

colorPanelButtons.forEach((colorPanelButton, index) => {
  addListenersToTogglePanel(colorPanelButton, index);
});

libraryButton.addEventListener("click", function () {
  libraryModalExitButton.parentElement.parentElement.classList.toggle(
    "modal-container-active"
  );
});

libraryModalExitButton.addEventListener("click", function () {
  this.parentElement.parentElement.classList.toggle("modal-container-active");
});

// Functions

function addListenertoHeader(paletteHeader) {
  paletteHeader.addEventListener("click", function () {
    toggleModal(copiedModal);
  });
}

function toggleModal(modal) {
  modal.parentElement.classList.toggle("modal-container-active");
}

function addListenersToTogglePanel(colorPanelButton, index) {
  const activeClass = "color-control-active";
  colorPanelButton.addEventListener("click", function (event) {
    colorControlPanels[index].classList.toggle(activeClass);
  });

  closeColorPanelButtons[index].addEventListener("click", () =>
    colorControlPanels[index].classList.toggle(activeClass)
  );
}
