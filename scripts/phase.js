const addDreamForm = document.querySelector("#js-add-dream-form");
const addBucketForm = document.querySelector("#js-add-phase-form");
const bucketList = document.querySelector(".js-dream-phase-list");
const bucketsSection = document.querySelector(".js-phase-name-input");
const editButton = document.querySelector(".js-edit-button");

function loadData(itemName) {
  const data = localStorage.getItem(itemName);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

//Start Goal Logic

function saveGoals(goals) {
  localStorage.setItem("goals", JSON.stringify(goals));
}

function renderItem(item) {
  const newItem = document.createElement("li");
  newItem.textContent = item.value;
  newItem.dataset.id = item.id;
  newItem.classList.add("dream-item");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove";
  deleteButton.classList.add(
    "js-delete-button",
    "button--secondary",
    "button--delete",
    "hidden"
  );
  newItem.appendChild(deleteButton);
  bucketList.appendChild(newItem);
}

function renderList(goals) {
  bucketList.replaceChildren();
  goals.forEach((item) => {
    renderItem(item);
  });
}

function removeItem(itemId) {
  const newGoals = goals.filter((goal) => {
    return goal.id.toString() !== itemId;
  });
  goals = newGoals;
  saveGoals(goals);
  renderList(goals);
}

let goals = loadData("goals");
renderList(goals);

addDreamForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const textInput = addDreamForm.elements["dream-name"];
  const newItem = { value: textInput.value, id: Date.now() };
  goals.push(newItem);
  saveGoals(goals);
  renderItem(newItem);
  textInput.value = "";
});

bucketList.addEventListener("click", (e) => {
  if (e.target.classList.contains("js-delete-button")) {
    const itemId = e.target.parentNode.dataset.id;
    removeItem(itemId);
  }
});

editButton.addEventListener("click", () => {
  console.log("clicked");
  const deleteButtons = document.querySelectorAll(".js-delete-button");

  if (deleteButtons) {
    deleteButtons.forEach((button) => {
      button.classList.remove("hidden");
    });
  }
});

//End Goal Logic
