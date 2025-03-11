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

function setAppTheme() {
  const themeButton = document.querySelector(".js-theme-button");
  const themeOptions = document.querySelector(".js-theme-options");
  const appContainer = document.querySelector(".js-application-container");

  if (!themeButton || !themeOptions || !appContainer) {
    console.error("Theme elements not found in the DOM.");
    return;
  }

  themeButton.addEventListener("click", () => {
    themeOptions.classList.toggle("theme-options--active");
  });

  themeOptions.addEventListener("click", (e) => {
    if (e.target.name === "theme") {
      const selectedTheme = document.querySelector(
        'input[name="theme"]:checked'
      ).value;

      if (selectedTheme === "darkMode") {
        appContainer.classList.add("dark-mode");
      } else {
        appContainer.classList.remove("dark-mode");
      }
    }
  });
}

export { createDeleteButton, getBaseUrl, loadData, saveData, setAppTheme };
