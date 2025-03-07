import { loadData, saveData, getBaseUrl } from "./utils.js";
import { createCloudSVG } from "./cloudSVG.js";

const addPhaseForm = document.querySelector("#js-add-phase-form");
const phaseNameInput = document.querySelector(".js-phase-name-input");
const phasesList = document.querySelector(".js-phases-list");

function buildPhaseUrl(phaseId) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}pages/phase.html?id=${phaseId}`;
  return url;
}

function renderPhase(phaseData) {
  const newItem = document.createElement("li");
  const cloudSVG = createCloudSVG("#A9B9D9", "#D9C5D2");
  const newAnchor = document.createElement("a");
  const id = phaseData.id;
  const url = buildPhaseUrl(id);
  newAnchor.setAttribute("href", url);
  const newAnchorText = document.createTextNode(phaseData.name);
  newAnchor.append(cloudSVG, newAnchorText);
  newItem.appendChild(newAnchor);
  phasesList.appendChild(newItem);
}

function renderPhases(dreamPhaseData) {
  dreamPhaseData.forEach((item) => {
    renderPhase(item);
  });
}

const dreamPhaseData = loadData("dreamPhaseData");
renderPhases(dreamPhaseData);

addPhaseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const phaseName = phaseNameInput.value;
  const phaseId = Date.now();
  const phaseData = {
    id: phaseId,
    name: phaseName,
    dreams: [],
  };
  dreamPhaseData.push(phaseData);
  saveData(dreamPhaseData, "dreamPhaseData");
  renderPhase(phaseData);
  phaseNameInput.value = "";
});
