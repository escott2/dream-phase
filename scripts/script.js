import {
  loadData,
  saveData,
  getBaseUrl,
  createDeleteButton,
  setAppTheme,
} from "./utils.js";
import { createCloudSVG } from "./cloudSVG.js";

function buildPhaseUrl(phaseId, getTheme) {
  const theme = getTheme();
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}pages/phase.html?id=${phaseId}&theme=${theme}`;
  return url;
}

function renderDeleteButtons(isEditListActive, deleteButtons) {
  if (deleteButtons) {
    deleteButtons.forEach((button) => {
      if (isEditListActive) {
        button.classList.remove("hidden");
      } else {
        button.classList.add("hidden");
      }
    });
  }
}

function removeItem(
  itemId,
  dreamPhaseData,
  phasesList,
  isEditListActive,
  getTheme
) {
  const newDreamPhaseData = dreamPhaseData.filter((phase) => {
    return phase.id.toString() !== itemId;
  });
  saveData(newDreamPhaseData, "dreamPhaseData");
  dreamPhaseData.length = 0;
  newDreamPhaseData.forEach((item) => dreamPhaseData.push(item));
  renderPhases(newDreamPhaseData, phasesList, isEditListActive, getTheme);
}

function renderPhase(phaseData, phasesList, isEditListActive, getTheme) {
  const newItem = document.createElement("li");
  const id = phaseData.id;
  newItem.dataset.id = id;
  const cloudSVG = createCloudSVG("#A9B9D9", "#D9C5D2");
  const newAnchor = document.createElement("a");
  const url = buildPhaseUrl(id, getTheme);
  newAnchor.setAttribute("href", url);
  const newAnchorText = document.createTextNode(phaseData.name);
  newAnchor.append(cloudSVG, newAnchorText);
  const deleteButton = createDeleteButton(isEditListActive);
  newItem.appendChild(newAnchor);
  newItem.appendChild(deleteButton);
  phasesList.appendChild(newItem);
}

function renderPhases(dreamPhaseData, phasesList, isEditListActive, getTheme) {
  phasesList.replaceChildren();
  dreamPhaseData.forEach((item) => {
    renderPhase(item, phasesList, isEditListActive, getTheme);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const addPhaseForm = document.querySelector("#js-add-phase-form");
  const phaseNameInput = document.querySelector(".js-phase-name-input");
  const phasesList = document.querySelector(".js-phases-list");
  const editListButton = document.querySelector(".js-edit-list-button");
  const editListActions = document.querySelector(".js-edit-list-actions");
  const editModeButton = document.querySelector(".js-edit-mode-button");

  const getTheme = setAppTheme();

  let isEditModeActive = false;
  let isEditListActive = false;

  const dreamPhaseData = loadData("dreamPhaseData");
  if (dreamPhaseData) {
    renderPhases(dreamPhaseData, phasesList, isEditListActive, getTheme);

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
      renderPhase(phaseData, phasesList, isEditListActive, getTheme);
      phaseNameInput.value = "";
    });

    phasesList.addEventListener("click", (e) => {
      if (e.target.classList.contains("js-delete-button")) {
        const itemId = e.target.parentNode.dataset.id;
        removeItem(
          itemId,
          dreamPhaseData,
          phasesList,
          isEditListActive,
          getTheme
        );
      }
    });

    // TODO - Refactor to use reusable utility functions for callback functions. Repeated code.
    editModeButton.addEventListener("click", () => {
      editListActions.classList.toggle("hidden");
      editListActions.classList.toggle("animate");

      if (isEditModeActive) {
        isEditModeActive = false;
        isEditListActive = false;
        editListButton.classList.remove("close");
      } else {
        isEditModeActive = true;
      }

      const ariaHiddenString = (!isEditModeActive).toString();
      editListActions.setAttribute("aria-hidden", ariaHiddenString);

      const deleteButtons = document.querySelectorAll(".js-delete-button");
      renderDeleteButtons(isEditListActive, deleteButtons);
    });

    editListButton.addEventListener("click", (e) => {
      e.currentTarget.classList.toggle("close");

      isEditListActive = isEditListActive ? false : true;

      const deleteButtons = document.querySelectorAll(".js-delete-button");
      renderDeleteButtons(isEditListActive, deleteButtons);
    });
  } else {
    console.log("error: No data found");
  }
});
