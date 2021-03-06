class PaletteControl {
  constructor(colorPalettes, buttons, modals, savedPalettesList) {
    this.colorPalettes = colorPalettes;
    this.buttons = buttons;
    this.modals = modals;
    this.storage = {};
    this.savedPalettesList = savedPalettesList;
    this.enableColorRefresh();
    this.enableSavePalette();
    this.readFromLocalStorage();
  }

  enableColorRefresh() {
    this.buttons.refreshButton.addEventListener("click", () => {
      this.colorPalettes.forEach((palette) => palette.applyColorToPalette());
    });
  }

  enableSavePalette() {
    const submitButton =
      this.modals.saveModal.element.querySelector("#save-form button");
    const nameInput =
      this.modals.saveModal.element.querySelector("#palette-name");
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      const savedPaletteName = nameInput.value;
      nameInput.value = "";
      this.savePalette(savedPaletteName);
    });
  }

  savePalette(nameOfPalette) {
    const savedColors = this.colorPalettes.map((palette) =>
      palette.backgroundColor.hex()
    );
    this.storage[nameOfPalette] = savedColors;
    this.writeToLocalStorage();
    this.readFromLocalStorage();
    this.modals.saveModal.toggleModal();
  }

  readFromLocalStorage() {
    const storedPalettes = localStorage.getItem("storedPalettes");
    if (!storedPalettes) return;
    this.storage = JSON.parse(storedPalettes);
    this.updateLibraryContent();
  }

  updateLibraryContent() {
    // index to set unique id for each savedPalette
    let i = 0;
    this.savedPalettesList.innerText = "";
    for (let namedPalette in this.storage) {
      let listElement = document.createElement("li");
      listElement.appendChild(this.createLabelElement(namedPalette, i));
      listElement.appendChild(
        this.createSavedPaletteCollection(namedPalette, i)
      );
      this.savedPalettesList.appendChild(listElement);
      i++;
    }
  }

  createLabelElement(innerText, idIndex) {
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", `entry${idIndex}`);
    labelElement.innerText = `${innerText}`;
    return labelElement;
  }

  createSavedPaletteCollection(namedPalette, idIndex) {
    let savedColorsDiv = document.createElement("div");
    savedColorsDiv.classList.add("saved-colors");
    savedColorsDiv.id = `entry${idIndex}`;
    this.storage[namedPalette].forEach((color) => {
      savedColorsDiv.appendChild(this.createDivBoxElement(color));
    });
    savedColorsDiv.appendChild(this.createSelectButton());
    return savedColorsDiv;
  }

  createDivBoxElement(color) {
    let boxDiv = document.createElement("div");
    boxDiv.classList.add("color");
    boxDiv.style.background = color;
    return boxDiv;
  }

  createSelectButton() {
    let selectButton = document.createElement("button");
    selectButton.classList.add("color");
    selectButton.innerText = `Select`;
    selectButton.addEventListener("click", (e) => {
      this.activatePalette(e);
    });
    return selectButton;
  }

  activatePalette(e) {
    const savedPaletteDivs = [...e.target.parentElement.children];
    // removes the button from the list
    savedPaletteDivs.pop();
    this.colorPalettes.forEach((palette, i) => {
      let backgroundColor = savedPaletteDivs[i].style.backgroundColor;
      palette.setBackgroundColor(backgroundColor);
    });
  }

  writeToLocalStorage() {
    localStorage.setItem("storedPalettes", JSON.stringify(this.storage));
  }
}
