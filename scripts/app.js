//  Enumerator

const modal = {
  save: 0,
  copied: 1,
  library: 2,
};

Object.freeze(modal);

// Selectors and Variables
const controllerButtons = {};
controllerButtons.saveButton = document.querySelector("#save-button");
controllerButtons.libraryButton = document.querySelector("#library-button");
controllerButtons.refreshButton = document.querySelector("#refresh-button");
const modalElements = document.querySelectorAll(".modal");
const palettes = document.querySelectorAll(".palette");
const savedPalettesList = modalElements[modal.library].querySelector(
  ".list-of-saved-palettes"
);
const listOfPalettes = [...palettes];
const palettesControlColourButtons = listOfPalettes.map(
  (palette) => palette.children[1]
);

const colorControlPanels = document.getElementsByClassName("color-control");

// Main

const activeModalClass = "modal-container-active";
const modals = [];

modals.push(
  new Modal(modalElements[modal.save], activeModalClass, true, [
    controllerButtons.saveButton,
  ])
);

modals.push(
  new Modal(modalElements[modal.library], activeModalClass, true, [
    controllerButtons.libraryButton,
  ])
);

const copiedModal = new Modal(
  modalElements[modal.copied],
  activeModalClass,
  true
);

const colorControlModals = [...colorControlPanels].map(
  (panel, index) =>
    new Modal(panel, "color-control-active", false, [
      palettesControlColourButtons[index],
    ])
);

const colorPalettes = listOfPalettes.map(
  (palette, index) =>
    new ColorPalette(palette, colorControlModals[index], copiedModal)
);

const paletteControl = new PaletteControl(
  colorPalettes,
  controllerButtons,
  {
    libraryModal: modals[modal.library],
    saveModal: modals[modal.save],
  },
  savedPalettesList
);
