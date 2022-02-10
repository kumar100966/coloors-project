class ColorPalette {
  constructor(colorPalette, colorControlModal, copiedModal) {
    this.colorPalette = colorPalette;
    this.paletteHeader = this.colorPalette.children[0];
    // true unlocked, false locked
    this.paletteState = true;
    this.paletteStateButton = this.colorPalette.children[2];
    this.unlockImage = this.paletteStateButton.children[0];
    this.lockImage = this.paletteStateButton.children[1];
    // Palette Control Panel
    this.colorControlModal = colorControlModal;
    this.rangeInputs = [];
    // Hue range input
    this.rangeInputs.push(this.colorControlModal.element.children[2]);
    // Saturation range input
    this.rangeInputs.push(this.colorControlModal.element.children[6]);
    // luminosity range input
    this.rangeInputs.push(this.colorControlModal.element.children[4]);
    this.backgroundColor;
    this.backgroundColorHSL;
    this.copiedModal = copiedModal;
    this.applyColorToPalette();
    this.addEventListenerOnRangeInputs();
    this.enableCopyHexToClipboard();
    this.enablePanelLock();
  }

  enablePanelLock() {
    this.paletteStateButton.addEventListener("click", () => {
      this.togglePanelState();
    });
  }

  togglePanelState() {
    if (this.paletteState) {
      this.paletteState = false;
      this.lockImage.style.display = "inline";
      this.unlockImage.style.display = "none";
    } else {
      this.paletteState = true;
      this.lockImage.style.display = "none";
      this.unlockImage.style.display = "inline";
    }
  }

  enableCopyHexToClipboard() {
    this.paletteHeader.addEventListener("click", () => {
      navigator.clipboard
        .writeText(this.paletteHeader.innerText)
        .then(() => this.copiedModal.toggleModal());
    });
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

  setBackgroundColor(backgroundColor) {
    const rgbArray = backgroundColor.slice(4, -1).split(",");
    for (const [i, rgbValue] of rgbArray.entries())
      rgbArray[i] = rgbValue.trim();
    // const formatedRgbArray = rgbArray.map((rgbValue) => rgbValue.trim());
    this.backgroundColorHSL = chroma(rgbArray).hsl();
    this.applyColorToPalette(false);
  }

  applyColorToPalette(random = true) {
    if (random && this.paletteState) {
      this.backgroundColor = chroma.random();
      this.backgroundColorHSL = this.backgroundColor.hsl();
      this.updateColorControlPanel();
    } else {
      this.backgroundColor = chroma(...this.backgroundColorHSL, "hsl");
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
    this.rangeInputs[1].style.background = `linear-gradient(to right, ${minSaturation}, ${maxSaturation})`;
    const midBrightness = currentPaletteColor.set("hsl.l", 0.5);
    this.rangeInputs[2].style.background = `linear-gradient(to right, black, ${midBrightness}, white)`;
  }

  updateColorControlPanel() {
    for (const [index, rangeInput] of this.rangeInputs.entries()) {
      if (index == 0) rangeInput.value = this.backgroundColorHSL[index];
      else rangeInput.value = this.backgroundColorHSL[index] * 100;
    }
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
    // Add fill to button containing svg containing path
    // Update color control panel svg
    this.colorPalette.children[1].children[0].children[0].style.fill = color;
    // Update lock and unlock svg
    for (let i = 0; i < 2; i++) {
      this.colorPalette.children[2].children[i].children[0].style.fill = color;
    }
  }
}
