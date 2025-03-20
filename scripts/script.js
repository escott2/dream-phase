import {
  loadData,
  saveData,
  getBaseUrl,
  createDeleteButton,
  handleEditModeButtonClick,
  handleEditListButtonClick,
} from "./utils.js";
import { initializeTheme } from "./theme.js";
import { createCloudSVG } from "./cloudSVG.js";

function buildPhaseUrl(phaseId) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}pages/phase.html?id=${phaseId}`;
  return url;
}

function createDreamPhaseManager(phasesList) {
  let dreamPhaseData = loadData("dreamPhaseData");

  function removeItem(itemId) {
    dreamPhaseData = dreamPhaseData.filter(
      (phase) => phase.id.toString() !== itemId
    );
    saveData(dreamPhaseData, "dreamPhaseData");
    renderPhases();
  }

  function renderPhase(phaseData) {
    const newItem = document.createElement("li");
    const id = phaseData.id;
    newItem.dataset.id = id;
    // const cloudSVG = createCloudSVG("#A9B9D9", "#D9C5D2");
    const newAnchor = document.createElement("a");
    const url = buildPhaseUrl(id);
    newAnchor.setAttribute("href", url);
    const newAnchorText = document.createTextNode(phaseData.name);
    const cloudImg = document.createElement("img");
    cloudImg.setAttribute("src", "../assets/blue-cloud.svg");
    cloudImg.setAttribute("alt", "cloud image");
    cloudImg.classList.add("phases-list-cloud");
    newAnchor.append(cloudImg, newAnchorText);
    const deleteButton = createDeleteButton();
    newItem.appendChild(newAnchor);
    newItem.appendChild(deleteButton);
    phasesList.appendChild(newItem);
  }

  function renderPhases() {
    if (!dreamPhaseData) {
      console.log("error: No data found");
      return;
    }

    phasesList.replaceChildren();
    dreamPhaseData.forEach((item) => {
      renderPhase(item);
    });
  }

  function addPhase(phaseName) {
    const phaseId = Date.now();
    const phaseData = {
      id: phaseId,
      name: phaseName,
      dreams: [],
    };
    dreamPhaseData.push(phaseData);
    saveData(dreamPhaseData, "dreamPhaseData");
    renderPhase(phaseData);
  }

  return {
    renderPhases,
    removeItem,
    addPhase,
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const addPhaseForm = document.querySelector("#js-add-phase-form");
  const phaseNameInput = document.querySelector(".js-phase-name-input");
  const phasesList = document.querySelector(".js-phases-list");
  const editListButton = document.querySelector(".js-edit-list-button");
  const editModeButton = document.querySelector(".js-edit-mode-button");

  initializeTheme();

  const phaseManager = createDreamPhaseManager(phasesList);
  phaseManager.renderPhases();

  addPhaseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    phaseManager.addPhase(phaseNameInput.value);
    phaseNameInput.value = "";
  });

  phasesList.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-delete-button")) {
      const itemId = e.target.parentNode.dataset.id;
      phaseManager.removeItem(itemId);
    }
  });

  editModeButton.addEventListener("click", () =>
    handleEditModeButtonClick(editListButton)
  );

  editListButton.addEventListener("click", handleEditListButtonClick);
});
