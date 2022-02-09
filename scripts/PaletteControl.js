class PaletteControl {
  constructor(colorPalettes, buttons, modals) {
    this.colorPalettes = colorPalettes;
    this.buttons = buttons;
    this.modals = modals;
    this.enableColorRefresh();
    this.storage = {};
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
  }

  readFromLocalStorage() {
    const storedPalettes = localStorage.get("storedPalettes");
    if (!storedPalettes) return;
    this.storage = JSON.parse(storedPalettes);
  }

  updateLibrary() {}

  writeToLocalStorage() {
    localStorage.setItem("storedPalettes", JSON.stringify(this.storage));
  }
}
