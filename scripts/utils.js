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

function applyTheme(selectedTheme, appContainer) {
  if (selectedTheme === "darkMode") {
    appContainer.classList.add("dark-mode");
  } else {
    appContainer.classList.remove("dark-mode");
  }
}

function setAppTheme() {
  const themeButton = document.querySelector(".js-theme-button");
  const themeOptions = document.querySelector(".js-theme-options-container");
  const appContainer = document.querySelector(".js-application-container");
  const closeThemeOptionsButton = document.querySelector(
    ".js-theme-options-close-button"
  );

  function getPreferredColorScheme() {
    if (window.matchMedia) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "darkMode";
      } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "lightMode";
      }
    }
    return "lightMode";
  }

  let selectedTheme = localStorage.getItem("dreamPhaseTheme");

  if (!selectedTheme) {
    selectedTheme = getPreferredColorScheme();
  }

  function getTheme() {
    return selectedTheme;
  }

  function setRadioDefault() {
    const lightModeRadio = document.querySelector("#lightMode");
    const darkModeRadio = document.querySelector("#darkMode");
    if (selectedTheme === "lightMode") {
      lightModeRadio.checked = true;
    } else {
      darkModeRadio.checked = true;
    }
  }

  setRadioDefault();
  applyTheme(selectedTheme, appContainer);

  if (!themeButton || !themeOptions || !appContainer) {
    console.error("Theme elements not found in the DOM.");
    return;
  }

  themeButton.addEventListener("click", () => {
    themeOptions.classList.toggle("theme-options--active");
  });

  themeOptions.addEventListener("click", (e) => {
    if (e.target.name === "theme") {
      selectedTheme = document.querySelector(
        'input[name="theme"]:checked'
      ).value;

      applyTheme(selectedTheme, appContainer);
      localStorage.setItem("dreamPhaseTheme", selectedTheme);
    }
  });

  //Can be moved into themeOptions event listener with event delegation
  closeThemeOptionsButton.addEventListener("click", (e) => {
    e.preventDefault();
    themeOptions.classList.remove("theme-options--active");
  });

  return getTheme;
}

export {
  createDeleteButton,
  getBaseUrl,
  loadData,
  saveData,
  setAppTheme,
  applyTheme,
};
