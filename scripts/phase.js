const addDreamForm = document.querySelector("#js-add-dream-form");
const addBucketForm = document.querySelector("#js-add-phase-form");
const bucketList = document.querySelector(".js-dream-phase-list");
const bucketsSection = document.querySelector(".js-phase-name-input");
const editModeButton = document.querySelector(".js-edit-mode-button");
const editListButton = document.querySelector(".js-edit-list-button");
const editListActions = document.querySelector(".js-edit-list-actions");

let isEditModeActive = false;
let isEditListActive = false;

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
  newItem.dataset.id = item.id;
  newItem.classList.add("dream-item");
  const textSpan = document.createElement("span");
  textSpan.classList.add("dream-name");
  textSpan.textContent = item.value;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove";
  deleteButton.classList.add(
    "js-delete-button",
    "button--secondary",
    "button--delete",
    "hidden"
  );
  console.log(isEditListActive, "isEditListActive");
  if (isEditListActive) {
    deleteButton.classList.remove("hidden");
  }
  newItem.appendChild(textSpan);
  newItem.appendChild(deleteButton);
  bucketList.appendChild(newItem);
}

function renderList(goals) {
  bucketList.replaceChildren();
  goals.forEach((item) => {
    renderItem(item);
  });
}

function renderDeleteButtons(isEditListActive) {
  const deleteButtons = document.querySelectorAll(".js-delete-button");

  if (deleteButtons) {
    deleteButtons.forEach((button) => {
      // button.classList.toggle("hidden");
      if (isEditListActive) {
        button.classList.remove("hidden");
      } else {
        button.classList.add("hidden");
      }
    });
  }
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

editModeButton.addEventListener("click", () => {
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
  console.log("ariaHiddenString", ariaHiddenString);

  editListActions.setAttribute("aria-hidden", ariaHiddenString);

  renderDeleteButtons(isEditListActive);
});

editListButton.addEventListener("click", (e) => {
  e.currentTarget.classList.toggle("close");

  isEditListActive = isEditListActive ? false : true;

  renderDeleteButtons(isEditListActive);
});

//End Goal Logic
