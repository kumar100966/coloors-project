// Selectors

const saveButton = document.querySelector("#save-button");
const libraryButton = document.querySelector("#library-button");
const exitButtons = document.querySelectorAll(".close");
const saveModalExitButton = exitButtons[0];
const saveModal = saveModalExitButton.parentElement;
const copiedModalExitButton = exitButtons[1];
const copiedModal = copiedModalExitButton.parentElement;
const libraryModalExitButton = exitButtons[2];
const libraryModal = libraryModalExitButton.parentElement;
const paletteHeaders = document.querySelectorAll(".hex-value");
const colorPanelButtons = document.querySelectorAll(".activate-panel");
const colorControlPanels = document.querySelectorAll(".color-control");

// Retrieving buttons from the color palette control panels
const closeColorPanelButtons = [...colorControlPanels].map(
  (panel) => panel.firstElementChild
);

// Main

const activeModalClass = "modal-container-active";

enableModalToggle(saveButton, saveModal, activeModalClass);

enableModalToggle(saveModalExitButton, saveModal, activeModalClass);

paletteHeaders.forEach((paletteHeader) => {
  enableModalToggle(paletteHeader, copiedModal, activeModalClass);
});

enableModalToggle(copiedModalExitButton, copiedModal, activeModalClass);

colorPanelButtons.forEach((colorPanelButton, index) => {
  addListenersToTogglePanel(colorPanelButton, index);
});

enableModalToggle(libraryButton, libraryModal, activeModalClass);
enableModalToggle(libraryModalExitButton, libraryModal, activeModalClass);

// Functions

function addListenersToTogglePanel(colorPanelButton, index) {
  const activeClass = "color-control-active";
  enableModalToggle(
    colorPanelButton,
    colorControlPanels[index],
    activeClass,
    false
  );

  enableModalToggle(
    closeColorPanelButtons[index],
    colorControlPanels[index],
    activeClass,
    false
  );
}

function enableModalToggle(
  activatorElement,
  modalActivated,
  activeClass,
  useModalParent
) {
  activatorElement.addEventListener("click", () => {
    toggleModal(modalActivated, activeClass, useModalParent);
  });
}

function toggleModal(modal, activeClass, useModalParent = true) {
  if (useModalParent) {
    modal.parentElement.classList.toggle(activeClass);
    return;
  }

  modal.classList.toggle(activeClass);
}
