"use strict";
console.log("Yerp!");
const qs = (s) => document.querySelector(s);

window.addEventListener("DOMContentLoaded", init);

function init() {
  const input = qs("input");
  input.addEventListener("input", handleInput);
}

function handleInput(e) { // The delegator function
  // Convert hex to rgb, hsl and css:
  const hexCode = e.target.value; // Get the hexcode from input event
  const rgbObj = hexToRgb(hexCode); // Conv hex to rgb, return obj
  const hslCode = rgbToHsl(rgbObj); // Conv rgb to hsl
  const cssCode = rgbToCss(rgbObj);

  // Display everything:
  displayColorField(cssCode);
  displayHexCode(hexCode);
  displayRgbCode(rgbObj);
  displayHslCode(hslCode);
}

function hexToRgb(hexCode) {
  const r = parseInt(hexCode.substring(1, 3), 16); // Convert hex values to rgb
  const g = parseInt(hexCode.substring(3, 5), 16); 
  const b = parseInt(hexCode.substring(5, 7), 16);
  
  return {r, g, b};
}

function rgbToCss(rgbObj) {
  const cssRgb = `rgb(${rgbObj.r} ${rgbObj.g} ${rgbObj.b})`;

  return cssRgb;
}

function rgbToHsl({r, g, b}) {
  
  r /= 255;        // Convert values (total black box!)
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

  h = Math.round(h); // Return HSL results, rounded to 0 decimals
  s = Math.round(s);
  l = Math.round(l);
  
  return {h, s, l};
}

function displayColorField(cssCode) {
    // Show color in color field
    const colField = qs('#color_field');
    colField.style.backgroundColor = `${cssCode}`;
}

function displayHexCode(hexCode) {
  qs('.hex > span').textContent = `${hexCode}`;
}

function displayRgbCode({r, g, b}) {
  qs('.rgb > span').textContent = `${r}, ${g}, ${b}`;
}

function displayHslCode({h, s, l}) {
  qs('.hsl > span').textContent = `${h}, ${s}%, ${l}%`;
}

// Not really needed for this assignment:

// function rgbToHex() {
//   const redPart = rgbCode.substring(0, rgbCode.indexOf(" "));
//   const redHex = Number(redPart).toString(16).padStart(2, "0");
// }
// Display values in value fields
  
