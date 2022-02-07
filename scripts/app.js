// Selectors and Variables
const saveButton = document.querySelector("#save-button");
const libraryButton = document.querySelector("#library-button");
const controlSectionModalElements = document.querySelectorAll(".modal");

const palettes = document.querySelectorAll(".palette");
const colorControlPanels = document.getElementsByClassName("color-control");

// Main

const activeModalClass = "modal-container-active";
const modals = [];

modals.push(
  new Modal(controlSectionModalElements[0], activeModalClass, true, [
    saveButton,
  ])
);

modals.push(
  new Modal(controlSectionModalElements[2], activeModalClass, true, [
    libraryButton,
  ])
);

const colorControlModals = [...colorControlPanels].map((panel, index) => {
  new Modal(panel, "color-control-active", false, [
    palettes[index].children[1],
  ]);
});

palettes.forEach(
  (palette) =>
    new Modal(controlSectionModalElements[1], activeModalClass, true, [
      palette.children[0],
    ])
);

const colorPalettes = [...palettes].map(
  (palette, index) => new ColorPalette(palette, colorControlModals[index])
);

colorPalettes.forEach((palette) => palette.applyRandomColorToPalette());
