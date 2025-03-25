import {
  loadData,
  saveData,
  createDeleteButton,
  handleEditListButtonClick,
  handleEditModeButtonClick,
} from "./utils.js";
import { initializeTheme } from "./theme.js";

function createDreamPhasePageManager(
  dreamPhaseList,
  addDreamForm,
  phaseNameHeading,
  breadcrumbs,
  pageTitleContainer
) {
  const params = new URLSearchParams(window.location.search);
  let phaseId = params.get("id");
  let dreamPhaseData;
  let phaseData;
  let dreams;

  function saveDreams() {
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

    const deleteButton = createDeleteButton(item.value);

    newItem.append(checkboxInput, checkboxLabel, deleteButton);
    dreamPhaseList.appendChild(newItem);
  }

  function renderList() {
    dreamPhaseList.replaceChildren();
    dreams.forEach((item) => {
      renderItem(item);
    });
  }

  function removeItem(itemId) {
    dreams = dreams.filter((dream) => dream.id.toString() !== itemId);
    saveDreams();
    renderList();
  }

  function initialize() {
    if (phaseId) {
      dreamPhaseData = loadData("dreamPhaseData");
      phaseData = dreamPhaseData.find(
        (element) => element.id === parseInt(phaseId)
      );

      if (phaseData) {
        dreams = phaseData.dreams;
        renderList();
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
        saveDreams();
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
          saveDreams();
        }
      });
    } else {
      console.log("error: No phase id passed");
    }
  }

  return {
    initialize,
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const addDreamForm = document.querySelector("#js-add-dream-form");
  const dreamPhaseList = document.querySelector(".js-dream-phase-list");
  const editModeButton = document.querySelector(".js-edit-mode-button");
  const editListButton = document.querySelector(".js-edit-list-button");
  const phaseNameHeading = document.querySelector(".js-phase-name");
  const breadcrumbs = document.querySelector(".js-breadcrumbs");
  const pageTitleContainer = document.querySelector(".js-page-title-container");

  initializeTheme();

  const dreamPhasePageManager = createDreamPhasePageManager(
    dreamPhaseList,
    addDreamForm,
    phaseNameHeading,
    breadcrumbs,
    pageTitleContainer
  );

  dreamPhasePageManager.initialize();

  editModeButton.addEventListener("click", () =>
    handleEditModeButtonClick(editListButton)
  );

  editListButton.addEventListener("click", handleEditListButtonClick);
});
