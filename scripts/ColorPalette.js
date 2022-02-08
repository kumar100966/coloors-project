class ColorPalette {
  constructor(colorPalette, colorControlModal) {
    this.colorPalette = colorPalette;
    this.paletteHeader = this.colorPalette.children[0];
    this.colorControlModal = colorControlModal;
    this.hueInput = this.colorControlModal.modal.children[2];
    this.brightnessInput = this.colorControlModal.modal.children[4];
    this.saturationInput = this.colorControlModal.modal.children[6];
    this.backgroundColor;
    this.backgroundColorHSL;
    this.applyColorToPalette();
    this.addEventListenerOnRangeInputs();
  }

  addEventListenerOnRangeInputs() {
    this.addEventListenerOnRangeInput(this.hueInput);
    this.addEventListenerOnRangeInput(this.saturationInput);
    this.addEventListenerOnRangeInput(this.brightnessInput);
  }

  addEventListenerOnRangeInput(rangeInput) {
    let hslIndex;
    switch (rangeInput) {
      case this.hueInput:
        hslIndex = 0;
        break;
      case this.saturationInput:
        hslIndex = 1;
        break;
      case this.brightnessInput:
        hslIndex = 2;
        break;
    }
    rangeInput.addEventListener("input", () => {
      this.backgroundColorHSL[hslIndex] = parseInt(rangeInput.value);
      this.applyColorToPalette(false);
    });
  }

  applyColorToPalette(random = true) {
    if (random) {
      this.backgroundColor = chroma.random();
      this.backgroundColorHSL = this.backgroundColor.hsl();
    } else {
      console.log(this.backgroundColorHSL);
      this.backgroundColor = chroma(this.backgroundColorHSL, "hsl");
    }
    this.paletteHeader.innerText = this.backgroundColor;
    this.colorPalette.style.background = `${this.backgroundColor}`;
    this.checkLabelContrast();
  }

  checkLabelContrast() {
    const white = "#ffffff";
    const black = "#000000";
    const paletteComputedStyle = window.getComputedStyle(
      this.colorPalette,
      null
    );
    const constrastRatio = chroma.contrast(
      this.backgroundColor,
      paletteComputedStyle.color
    );

    // bad contrast < 4.5
    if (constrastRatio > 5.5) return;

    const textColorHex = chroma(paletteComputedStyle.color).hex();
    switch (textColorHex) {
      case white:
        this.updatePaletteTextColor(black);
        break;
      case black:
        this.updatePaletteTextColor(white);
        break;
    }
  }

  updatePaletteTextColor(color) {
    this.color = color;
    this.colorPalette.style.color = color;
    // Update the svg fill colors
    this.colorPalette.children[1].children[0].children[0].style.fill = color;
    this.colorPalette.children[2].children[0].children[0].style.fill = color;
  }
}
