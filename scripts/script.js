const addPhaseForm = document.querySelector("#js-add-phase-form");
const phaseNameInput = document.querySelector(".js-phase-name-input");
const addPhaseButton = document.querySelector(".js-submit-button");

const phasesList = document.querySelector(".js-phases-list");

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

function renderPhase(phaseData) {
  const newItem = document.createElement("li");
  newItem.textContent = phaseData.name;
  phasesList.appendChild(newItem);
}

function renderPhases(dreamPhaseData) {
  dreamPhaseData.forEach((item) => {
    renderPhase(item);
  });
}

//Start Phases Logic

const dreamPhaseData = loadData("dreamPhaseData");
console.log(dreamPhaseData);
renderPhases(dreamPhaseData);

addPhaseButton.addEventListener("click", (e) => {
  e.preventDefault();
  const phaseName = phaseNameInput.value;
  const phaseData = {
    id: Date.now(),
    name: phaseName,
    dreams: [],
  };
  dreamPhaseData.push(phaseData);
  saveData(dreamPhaseData, "dreamPhaseData");
  renderPhase(phaseData);
  phaseNameInput.value = "";
});

//End Phases Logic
