const themeButton = document.querySelector(".js-theme-button");
const themeOptions = document.querySelector(".js-theme-options-container");
const appContainer = document.querySelector(".js-application-container");
const closeThemeOptionsButton = document.querySelector(
  ".js-theme-options-close-button"
);

let selectedTheme = localStorage.getItem("dreamPhaseTheme");

if (!selectedTheme) {
  selectedTheme = getPreferredColorScheme();
}

function setupListeners() {
  themeButton.addEventListener("click", () => {
    themeOptions.classList.toggle("theme-options--active");
  });

  themeOptions.addEventListener("click", (e) => {
    if (e.target.name === "theme") {
      selectedTheme = document.querySelector(
        'input[name="theme"]:checked'
      ).value;

      applyThemeStyles(selectedTheme, appContainer);
      localStorage.setItem("dreamPhaseTheme", selectedTheme);
    }
  });

  closeThemeOptionsButton.addEventListener("click", (e) => {
    e.preventDefault();
    themeOptions.classList.remove("theme-options--active");
  });
}

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

function setDefaultThemeRadio(selectedTheme) {
  const lightModeRadio = document.querySelector("#lightMode");
  const darkModeRadio = document.querySelector("#darkMode");
  if (selectedTheme === "lightMode") {
    lightModeRadio.checked = true;
  } else {
    darkModeRadio.checked = true;
  }
}

function applyThemeStyles(selectedTheme, appContainer) {
  if (selectedTheme === "darkMode") {
    appContainer.classList.add("dark-mode");
  } else {
    appContainer.classList.remove("dark-mode");
  }
}

function initializeTheme() {
  setDefaultThemeRadio(selectedTheme);
  applyThemeStyles(selectedTheme, appContainer);
  setupListeners();
}

function getSelectedTheme() {
  return selectedTheme;
}

export { initializeTheme, getSelectedTheme };
