class ColorPalette {
  constructor(colorPalette, colorControlModal) {
    this.colorPalette = colorPalette;
    this.paletteHeader = this.colorPalette.children[0];
    this.colorControlModal = colorControlModal;
    this.backgroundColor;
    this.color;
    this.applyRandomColorToPalette();
  }

  applyRandomColorToPalette() {
    const randomColor = chroma.random();
    this.paletteHeader.innerText = randomColor;
    this.colorPalette.style.background = `${randomColor}`;
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
      paletteComputedStyle.backgroundColor,
      paletteComputedStyle.color
    );
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
    this.colorPalette.style.color = color;
    this.colorPalette.children[1].children[0].children[0].style.fill = color;
    this.colorPalette.children[2].children[0].children[0].style.fill = color;
  }
}
