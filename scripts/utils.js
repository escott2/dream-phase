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

function createDeleteButton(isEditListActive) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove";
  deleteButton.classList.add(
    "js-delete-button",
    "button--secondary",
    "button--delete",
    "hidden"
  );
  if (isEditListActive) {
    deleteButton.classList.remove("hidden");
  }
  return deleteButton;
}

export { createDeleteButton, getBaseUrl, loadData, saveData };
