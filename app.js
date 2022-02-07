// Selectors and Variables

const saveButton = document.querySelector("#save-button");
const libraryButton = document.querySelector("#library-button");
const exitButtons = document.querySelectorAll(".close");
const saveModalExitButton = exitButtons[0];
const saveModal = saveModalExitButton.parentElement;
const copiedModalExitButton = exitButtons[1];
const copiedModal = copiedModalExitButton.parentElement;
const libraryModalExitButton = exitButtons[2];
const libraryModal = libraryModalExitButton.parentElement;

const palettes = document.querySelectorAll(".palette");
const colorControlPanels = document.querySelectorAll(".color-control");
const colorPalettes = [...palettes].map(
  (palette, index) => new ColorPalette(palette, colorControlPanels[index])
);

// Retrieving buttons from the color palette control panels
const closeColorPanelButtons = [...colorControlPanels].map(
  (panel) => panel.firstElementChild
);

// Main

const activeModalClass = "modal-container-active";

enableModalToggle(saveButton, saveModal, activeModalClass);

enableModalToggle(saveModalExitButton, saveModal, activeModalClass);

colorPalettes.forEach((palette, index) => {
  enableModalToggle(palette.paletteHeader, copiedModal, activeModalClass);
  addListenersToTogglePanel(palette.colorControlButton, index);
});

enableModalToggle(copiedModalExitButton, copiedModal, activeModalClass);

enableModalToggle(libraryButton, libraryModal, activeModalClass);
enableModalToggle(libraryModalExitButton, libraryModal, activeModalClass);

colorPalettes.forEach((palette) => palette.applyRandomColorToPalette());

// Functions

function addListenersToTogglePanel(colorPanelButton, index) {
  const activeClass = "color-control-active";
  enableModalToggle(
    colorPanelButton,
    colorPalettes[index].colorControlPanel,
    activeClass,
    false
  );

  enableModalToggle(
    closeColorPanelButtons[index],
    colorPalettes[index].colorControlPanel,
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
