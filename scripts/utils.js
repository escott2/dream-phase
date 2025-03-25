let isEditModeActive = false;
let isEditListActive = false;

function loadData(keyName) {
  const data = localStorage.getItem(keyName);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

function saveData(data, keyName) {
  localStorage.setItem(keyName, JSON.stringify(data));
}

function getBaseUrl(repositoryName = "dream-phase") {
  if (window.location.pathname.includes(`/${repositoryName}/`)) {
    return `/${repositoryName}/`;
  }
  return "/";
}

function createDeleteButton(itemLabel) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove";
  deleteButton.classList.add(
    "js-delete-button",
    "button--secondary",
    "button--delete",
    "hidden"
  );
  deleteButton.setAttribute("aria-label", `Delete ${itemLabel}`);
  if (isEditListActive) {
    deleteButton.classList.remove("hidden");
  }
  return deleteButton;
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

function handleEditListButtonClick(e) {
  e.currentTarget.classList.toggle("close");

  isEditListActive = isEditListActive ? false : true;

  const deleteButtons = document.querySelectorAll(".js-delete-button");
  renderDeleteButtons(isEditListActive, deleteButtons);
}

function handleEditModeButtonClick(editListButton) {
  const editListActions = document.querySelector(".js-edit-list-actions");

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
  editListActions.setAttribute("aria-expanded", isEditModeActive.toString());

  const deleteButtons = document.querySelectorAll(".js-delete-button");
  renderDeleteButtons(isEditListActive, deleteButtons);
}

export {
  createDeleteButton,
  getBaseUrl,
  loadData,
  saveData,
  handleEditListButtonClick,
  handleEditModeButtonClick,
};
