import { loadData, saveData, createDeleteButton } from "./utils.js";
import { createCloudSVG } from "./cloudSVG.js";

const addDreamForm = document.querySelector("#js-add-dream-form");
const dreamPhaseList = document.querySelector(".js-dream-phase-list");
const editModeButton = document.querySelector(".js-edit-mode-button");
const editListButton = document.querySelector(".js-edit-list-button");
const editListActions = document.querySelector(".js-edit-list-actions");
const phaseNameHeading = document.querySelector(".js-phase-name");
const breadcrumbs = document.querySelector(".js-breadcrumbs");
const pageTitleContainer = document.querySelector(".js-page-title-container");

const params = new URLSearchParams(window.location.search);
let phaseId = params.get("id");

let isEditModeActive = false;
let isEditListActive = false;

let dreamPhaseData;
let phaseData;
let dreams;

function saveDreams(dreamPhaseData, phaseData, dreams) {
  const updatedPhaseData = {
    ...phaseData,
    dreams: dreams,
  };

  const index = dreamPhaseData.findIndex(
    (element) => element.id === parseInt(phaseId)
  );

  if (index !== -1) {
    const newDreamPhaseData = [...dreamPhaseData];
    newDreamPhaseData[index] = updatedPhaseData;
    saveData(newDreamPhaseData, "dreamPhaseData");
  }
}

function renderPhaseNameHeading(phaseName) {
  phaseNameHeading.textContent = phaseName;
}

function renderPhaseNameBreadcrumbs(phaseName) {
  const newText = document.createTextNode(phaseName);
  breadcrumbs.appendChild(newText);
}

function renderCloudSVG(color) {
  const cloudSVG = createCloudSVG();
  pageTitleContainer.appendChild(cloudSVG);
}

function renderItem(item) {
  const newItem = document.createElement("li");
  newItem.dataset.id = item.id;
  newItem.classList.add("dream-item");
  const checkboxInput = document.createElement("input");
  checkboxInput.setAttribute("type", "checkbox");
  checkboxInput.setAttribute("id", `${item.id}`);
  checkboxInput.checked = item.isChecked;
  checkboxInput.classList.add("js-dream-checkbox");
  const checkboxLabel = document.createElement("label");
  checkboxLabel.classList.add("dream-name");
  checkboxLabel.textContent = item.value;
  checkboxLabel.setAttribute("for", `${item.id}`);
  const deleteButton = createDeleteButton(isEditListActive);
  newItem.append(checkboxInput, checkboxLabel, deleteButton);
  dreamPhaseList.appendChild(newItem);
}

function renderList(dreams) {
  dreamPhaseList.replaceChildren();
  dreams.forEach((item) => {
    renderItem(item);
  });
}

function renderDeleteButtons(isEditListActive) {
  const deleteButtons = document.querySelectorAll(".js-delete-button");

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

function removeItem(itemId) {
  const newDreams = dreams.filter((dream) => {
    return dream.id.toString() !== itemId;
  });
  dreams = newDreams;
  saveDreams(dreamPhaseData, phaseData, dreams);
  renderList(dreams);
}

if (phaseId) {
  dreamPhaseData = loadData("dreamPhaseData");
  phaseData = dreamPhaseData.find(
    (element) => element.id === parseInt(phaseId)
  );

  if (phaseData) {
    dreams = phaseData.dreams;
    renderList(dreams);
    renderCloudSVG("#7891c3");
    renderPhaseNameHeading(phaseData.name);
    renderPhaseNameBreadcrumbs(phaseData.name);
  } else {
    console.log("error loading phase data");
  }

  addDreamForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const textInput = addDreamForm.elements["dream-name"];
    const newItem = {
      value: textInput.value,
      id: Date.now(),
      isChecked: false,
    };
    dreams.push(newItem);

    saveDreams(dreamPhaseData, phaseData, dreams);

    renderItem(newItem);
    textInput.value = "";
  });

  dreamPhaseList.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-delete-button")) {
      const itemId = e.target.parentNode.dataset.id;
      removeItem(itemId);
    }

    if (e.target.classList.contains("js-dream-checkbox")) {
      const dreamCheckbox = e.target;
      const itemId = dreamCheckbox.parentNode.dataset.id;
      const targetDreamIndex = dreams.findIndex(
        (dream) => dream.id.toString() === itemId
      );
      const updatedDream = { ...dreams[targetDreamIndex] };
      updatedDream.isChecked = dreamCheckbox.checked;
      dreams[targetDreamIndex] = updatedDream;

      saveDreams(dreamPhaseData, phaseData, dreams);
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

    renderDeleteButtons(isEditListActive);
  });

  editListButton.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("close");

    isEditListActive = isEditListActive ? false : true;

    renderDeleteButtons(isEditListActive);
  });
} else {
  console.log("error: No phase id passed");
}
