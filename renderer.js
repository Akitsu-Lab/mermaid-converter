const { ipcRenderer } = require("electron");

const convertBtn = document.getElementById("convertBtn");
const input = document.getElementById("input");
const output = document.getElementById("output");

convertBtn.addEventListener("click", () => {
  const mermaidCode = input.value;
  ipcRenderer.send("convert", mermaidCode);
});

ipcRenderer.on("converted", (event, svg) => {
  output.innerHTML = svg;
});
