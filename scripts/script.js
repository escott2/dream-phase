import {
  loadData,
  saveData,
  getBaseUrl,
  createDeleteButton,
  handleEditModeButtonClick,
  handleEditListButtonClick,
} from "./utils.js";
import { initializeTheme } from "./theme.js";

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

    const newAnchor = document.createElement("a");
    const url = buildPhaseUrl(id);
    newAnchor.setAttribute("href", url);

    const newAnchorText = document.createTextNode(phaseData.name);

    const cloudImg = document.createElement("img");
    cloudImg.setAttribute("src", "assets/blue-cloud.svg");
    cloudImg.setAttribute("alt", "");
    cloudImg.setAttribute("aria-hidden", "true");
    cloudImg.classList.add("phases-list-cloud");

    newAnchor.append(cloudImg, newAnchorText);

    const deleteButton = createDeleteButton(phaseData.name);

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
  const confirmRemovalModal = document.querySelector(
    ".js-confirm-removal-modal"
  );
  const confirmRemovalButton = document.querySelector(".js-confirm-yes-button");
  const denyRemovalButton = document.querySelector(".js-confirm-no-button");

  let itemIdToRemove = null;
  let triggeringElement = null;

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
      itemIdToRemove = e.target.parentNode.dataset.id;
      triggeringElement = e.currentTarget;
      confirmRemovalModal.removeAttribute("inert", "");
      confirmRemovalModal.classList.remove("hidden");
    }
  });

  confirmRemovalButton.addEventListener("click", () => {
    if (itemIdToRemove) {
      phaseManager.removeItem(itemIdToRemove);
    }
    closeConfirmRemovalModal();
  });

  denyRemovalButton.addEventListener("click", () => {
    closeConfirmRemovalModal();
  });

  editModeButton.addEventListener("click", () =>
    handleEditModeButtonClick(editListButton)
  );

  editListButton.addEventListener("click", handleEditListButtonClick);

  function closeConfirmRemovalModal() {
    itemIdToRemove = null;
    confirmRemovalModal.classList.add("hidden");
    if (triggeringElement) {
      console.log("triggeringElement", triggeringElement);
      triggeringElement.focus();
      triggeringElement = null;
    }
    confirmRemovalModal.setAttribute("inert", "");
  }
});
