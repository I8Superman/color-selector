"use strict";
console.log("Yerp!");
const qs = (s) => document.querySelector(s);

window.addEventListener('DOMContentLoaded', init);

function init() {
  const input = qs("input");
  input.addEventListener('input', handleInput);
}

function handleInput(e) {

  console.log(this.value);
}
