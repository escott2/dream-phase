const addPhaseForm = document.querySelector("#js-add-phase-form");
const phaseNameInput = document.querySelector(".js-phase-name-input");
const addPhaseButton = document.querySelector(".js-submit-button");

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

//Start Phases Logic

const dreamPhaseData = loadData("dreamPhaseData");
console.log(dreamPhaseData);
// renderList(dreamPhaseData);

addPhaseButton.addEventListener("click", (e) => {
  e.preventDefault();
  const phaseName = phaseNameInput.value;
  const phaseData = {
    id: Date.now(),
    name: phaseName,
    dreams: [],
  };
  const updatedData = [...dreamPhaseData, phaseData];
  saveData(updatedData, "dreamPhaseData");

  // renderItem(newItem);
  phaseNameInput.value = "";

  console.log(phaseName);
  console.log(updatedData);
});

//End Phases Logic
