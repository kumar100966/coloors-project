class PaletteControl {
  constructor(colorPalettes, buttons, modals, savedPalettesList) {
    this.colorPalettes = colorPalettes;
    this.buttons = buttons;
    this.modals = modals;
    this.storage = {};
    this.savedPalettesList = savedPalettesList;
    this.enableColorRefresh();
    this.enableSavePalette();
  }

  enableColorRefresh() {
    this.buttons.refreshButton.addEventListener("click", () => {
      this.colorPalettes.forEach((palette) => palette.applyColorToPalette());
    });
  }

  enableSavePalette() {
    const submitButton =
      this.modals.saveModal.querySelector("#save-form button");
    const nameInput = this.modals.saveModal.querySelector("#palette-name");
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
  }

  readFromLocalStorage() {
    const storedPalettes = localStorage.getItem("storedPalettes");
    if (!storedPalettes) return;
    this.storage = JSON.parse(storedPalettes);
    this.updateLibraryContent();
  }

  updateLibraryContent() {
    let i = 0;
    for (let namedPalette in this.storage) {
      let listElement = document.createElement("li");
      let labelElement = document.createElement("label");
      labelElement.setAttribute("for", `entry${i}`);
      labelElement.innerText = `${namedPalette}`;
      listElement.appendChild(labelElement);
      let savedColorsDiv = document.createElement("div");
      savedColorsDiv.classList.add("saved-colors");
      savedColorsDiv.id = `entry${i}`;
      i++;
      this.storage[namedPalette].forEach((color) => {
        let boxDiv = document.createElement("div");
        boxDiv.classList.add("color");
        boxDiv.style.background = color;
        savedColorsDiv.appendChild(boxDiv);
      });
      let selectButton = document.createElement("div");
      selectButton.classList.add("color");
      selectButton.innerHTML = `<button class="select-palette">Select</button>`;
      savedColorsDiv.appendChild(selectButton);
      listElement.appendChild(savedColorsDiv);
      this.savedPalettesList.appendChild(listElement);
    }
  }

  writeToLocalStorage() {
    localStorage.setItem("storedPalettes", JSON.stringify(this.storage));
  }
}
