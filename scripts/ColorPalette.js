class ColorPalette {
  constructor(colorPalette, colorControlModal) {
    this.colorPalette = colorPalette;
    this.paletteHeader = this.colorPalette.children[0];
    this.colorControlModal = colorControlModal;
  }

  applyRandomColorToPalette() {
    const randomColor = chroma.random();
    this.paletteHeader.innerText = randomColor;
    this.colorPalette.style.background = `${randomColor}`;
  }
}
