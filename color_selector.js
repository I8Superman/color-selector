"use strict";
console.log("Yerp!");
const qs = (s) => document.querySelector(s);

window.addEventListener("DOMContentLoaded", init);

const colorOb = {
  hex: "",
  rgb: { r: 0, g: 0, b: 0 },
  hsl: { h: 0, s: 0, l: 0 },
};

function init() {
  const input = qs("input");
  input.addEventListener("input", handleInput);
}

function handleInput(e) {
  const hexCode = e.target.value; // Get the hexcode from the input event
  colorOb.hex = hexCode; // Send hex code to color object (above)
  hexToRgb(hexCode); // Send value of input to these functions (hex code)
  const r = colorOb.rgb.r; // Get the freshly generated rgb code from the color object
  const g = colorOb.rgb.g;
  const b = colorOb.rgb.b;
  hexToHsl(r, g, b); // Send the rgb code to be converted to HSL
  displayColor(); // Display ecerything
}

function hexToRgb(hexCode) {
  // Get the individual color parts, excluding the '#'
  const redPart = hexCode.substring(1, 3);
  const greenPart = hexCode.substring(3, 5);
  const bluePart = hexCode.substring(5, 7);
  // Convert the parts to RGB
  const r = Number.parseInt(redPart, 16);
  const g = Number.parseInt(greenPart, 16);
  const b = Number.parseInt(bluePart, 16);
  // Write the values to the color object
  colorOb.rgb.r = r;
  colorOb.rgb.g = g;
  colorOb.rgb.b = b;
}

function hexToHsl(r, g, b) { // recieves rgb code and translates the 3 numbers to letter parameters
  // Convert values (total black box!)
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  // Send HSL code to color object and round to neaerest whole number also
  colorOb.hsl.h = Number(h.toFixed(0));
  colorOb.hsl.s = Number(s.toFixed(0));
  colorOb.hsl.l = Number(l.toFixed(0));
}

function displayColor() {
    // Get the color data from the color object
    const hex = colorOb.hex
    const rgb = `${colorOb.rgb.r}, ${colorOb.rgb.g}, ${colorOb.rgb.b}`
    const hsl = `${colorOb.hsl.h}, ${colorOb.hsl.s}, ${colorOb.hsl.l}`
    
    // Display values in value fields
    qs('.hex > span').textContent = hex;
    qs('.rgb > span').textContent = rgb;
    qs('.hsl > span').textContent = hsl;
    // Show color in color field
    const colField = qs('#color_field');
    colField.style.backgroundColor = `${hex}`;
}
