const addDreamForm = document.querySelector("#js-add-dream-form");
const addBucketForm = document.querySelector("#js-add-phase-form");
const bucketList = document.querySelector(".js-dream-phase-list");

const bucketsSection = document.querySelector(".js-phase-name-input");

function loadData(itemName) {
  const data = localStorage.getItem(itemName);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

//Start Phases Logic

const dreamPhaseData = loadData("dreamPhaseData");
console.log(dreamPhaseData);

//End Phases Logic
