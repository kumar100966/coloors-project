class ColorPalette {
  constructor(colorPalette, colorControlModal) {
    this.colorPalette = colorPalette;
    this.paletteHeader = this.colorPalette.children[0];
    // Palette Control Panel
    this.colorControlModal = colorControlModal;
    this.rangeInputs = [];
    // Hue range input
    this.rangeInputs.push(this.colorControlModal.modal.children[2]);
    // Saturation range input
    this.rangeInputs.push(this.colorControlModal.modal.children[6]);
    // luminosity range input
    this.rangeInputs.push(this.colorControlModal.modal.children[4]);
    this.backgroundColor;
    this.backgroundColorHSL;
    this.applyColorToPalette();
    this.addEventListenerOnRangeInputs();
  }

  addEventListenerOnRangeInputs() {
    for (const [hslIndex, rangeInput] of this.rangeInputs.entries())
      rangeInput.addEventListener("input", () => {
        if (hslIndex == 0) {
          this.backgroundColorHSL[hslIndex] = parseInt(rangeInput.value);
        } else {
          this.backgroundColorHSL[hslIndex] = parseInt(rangeInput.value) / 100;
        }
        this.applyColorToPalette(false);
      });
  }

  applyColorToPalette(random = true) {
    if (random) {
      this.backgroundColor = chroma.random();
      this.backgroundColorHSL = this.backgroundColor.hsl();

      this.updateColorControlPanel();
    } else {
      this.backgroundColor = chroma(this.backgroundColorHSL, "hsl");
    }
    this.paletteHeader.innerText = this.backgroundColor;
    this.colorPalette.style.background = `${this.backgroundColor}`;
    this.checkLabelContrast();
    this.setRangeInputsBackgroundImage();
  }

  setRangeInputsBackgroundImage() {
    const currentPaletteColor = chroma(this.backgroundColor);
    const minSaturation = currentPaletteColor.set("hsl.s", 0);
    const maxSaturation = currentPaletteColor.set("hsl.s", 1);
    this.rangeInputs[2].style.background = `linear-gradient(to right, ${minSaturation}, ${maxSaturation})`;
    const midBrightness = currentPaletteColor.set("hsl.l", 0.5);
    this.rangeInputs[1].style.background = `linear-gradient(to right, black, ${midBrightness}, white)`;
  }

  updateColorControlPanel() {
    for (const [index, rangeInput] of this.rangeInputs.entries())
      rangeInput.value = this.backgroundColorHSL[index];
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
    for (let index = 1; index < 3; index++)
      this.colorPalette.children[index].children[0].children[0].style.fill =
        color;
  }
}
