class PaletteControl {
  constructor(colorPalettes, saveButton, libraryButton, refreshButton) {
    this.colorPalettes = colorPalettes;
    this.saveButton = saveButton;
    this.libraryButton = libraryButton;
    this.refreshButton = refreshButton;
    this.enableColorRefresh();
  }

  enableColorRefresh() {
    this.refreshButton.addEventListener("click", () => {
      this.colorPalettes.forEach((palette) => palette.applyColorToPalette());
    });
  }
}
