"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ColorPalette =
/*#__PURE__*/
function () {
  function ColorPalette(colorPalette, colorControlModal) {
    _classCallCheck(this, ColorPalette);

    this.colorPalette = colorPalette;
    this.paletteHeader = this.colorPalette.children[0]; // Palette Control Panel

    this.colorControlModal = colorControlModal;
    this.rangeInputs = []; // Hue range input

    this.rangeInputs.push(this.colorControlModal.modal.children[2]); // luminosity range input

    this.rangeInputs.push(this.colorControlModal.modal.children[4]); // Saturation range input

    this.rangeInputs.push(this.colorControlModal.modal.children[6]);
    this.backgroundColor;
    this.backgroundColorHSL;
    this.applyColorToPalette();
    this.addEventListenerOnRangeInputs();
  }

  _createClass(ColorPalette, [{
    key: "addEventListenerOnRangeInputs",
    value: function addEventListenerOnRangeInputs() {
      var _this = this;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var _step$value = _slicedToArray(_step.value, 2),
              hslIndex = _step$value[0],
              rangeInput = _step$value[1];

          rangeInput.addEventListener("input", function () {
            _this.backgroundColorHSL[hslIndex] = parseInt(rangeInput.value);

            _this.applyColorToPalette(false);
          });
        };

        for (var _iterator = this.rangeInputs.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "applyColorToPalette",
    value: function applyColorToPalette() {
      var random = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (random) {
        this.backgroundColor = chroma.random();
        this.backgroundColorHSL = this.backgroundColor.hsl();
        this.updateColorControlPanel();
      } else {
        this.backgroundColor = chroma(this.backgroundColorHSL, "hsl");
      }

      this.paletteHeader.innerText = this.backgroundColor;
      this.colorPalette.style.background = "".concat(this.backgroundColor);
      this.checkLabelContrast();
    }
  }, {
    key: "setRangeInputsBackgroundImage",
    value: function setRangeInputsBackgroundImage() {
      var currentPaletteColor = chroma(this.backgroundColor);
      var minSaturation = currentPaletteColor.set("hsl.s", 0);
      var maxSaturation = currentPaletteColor.set("hsl.s", 1);
      this.rangeInputs[3].style.background = "linear-gradient(to right, ".concat(minSaturation, ", ").concat(maxSaturation, ")");
    }
  }, {
    key: "updateColorControlPanel",
    value: function updateColorControlPanel() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.rangeInputs.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              index = _step2$value[0],
              rangeInput = _step2$value[1];

          rangeInput.value = this.backgroundColorHSL[index];
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "checkLabelContrast",
    value: function checkLabelContrast() {
      var white = "#ffffff";
      var black = "#000000";
      var paletteComputedStyle = window.getComputedStyle(this.colorPalette, null);
      var constrastRatio = chroma.contrast(this.backgroundColor, paletteComputedStyle.color); // bad contrast < 4.5

      if (constrastRatio > 5.5) return;
      var textColorHex = chroma(paletteComputedStyle.color).hex();

      switch (textColorHex) {
        case white:
          this.updatePaletteTextColor(black);
          break;

        case black:
          this.updatePaletteTextColor(white);
          break;
      }
    }
  }, {
    key: "updatePaletteTextColor",
    value: function updatePaletteTextColor(color) {
      this.color = color;
      this.colorPalette.style.color = color; // Update the svg fill colors

      for (var index = 1; index < 3; index++) {
        this.colorPalette.children[index].children[0].children[0].style.fill = color;
      }
    }
  }]);

  return ColorPalette;
}();