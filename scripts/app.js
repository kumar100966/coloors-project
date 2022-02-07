//  Enumerator

const modal = {
  save: 0,
  copied: 1,
  library: 2,
};

Object.freeze(modal);

// Selectors and Variables
const saveButton = document.querySelector("#save-button");
const libraryButton = document.querySelector("#library-button");
const modalElements = document.querySelectorAll(".modal");
const palettes = document.querySelectorAll(".palette");
const listOfPalettes = [...palettes];
const palettesControlColourButtons = listOfPalettes.map(
  (palette) => palette.children[1]
);

const palettesHeaders = listOfPalettes.map((palette) => palette.children[0]);
const colorControlPanels = document.getElementsByClassName("color-control");

// Main

const activeModalClass = "modal-container-active";
const modals = [];

modals.push(
  new Modal(modalElements[modal.save], activeModalClass, true, [saveButton])
);

modals.push(
  new Modal(modalElements[modal.library], activeModalClass, true, [
    libraryButton,
  ])
);

palettes.forEach(
  (palette, index) =>
    new Modal(modalElements[modal.copied], activeModalClass, true, [
      palettesHeaders[index],
    ])
);

const colorControlModals = [...colorControlPanels].map(
  (panel, index) =>
    new Modal(panel, "color-control-active", false, [
      palettesControlColourButtons[index],
    ])
);

const colorPalettes = listOfPalettes.map(
  (palette, index) => new ColorPalette(palette, colorControlModals[index])
);

// colorPalettes.forEach((palette) => palette.applyRandomColorToPalette());
