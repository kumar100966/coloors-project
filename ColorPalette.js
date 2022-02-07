class ColorPalette {
  constructor(colorPalette, colorControlPanel) {
    this.colorPalette = colorPalette;
    this.paletteHeader = this.colorPalette.children[0];
    this.colorControlButton = this.colorPalette.children[1];
    this.colorControlPanel = colorControlPanel;
  }

  applyRandomColorToPalette() {
    const randomColor = chroma.random();
    this.paletteHeader.innerText = randomColor;
    this.colorPalette.style.background = `${randomColor}`;
  }
}
