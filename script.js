const createForm = document.querySelector("#js-create-form");
const bucketList = document.querySelector(".js-bucket-list");

function loadGoals() {
  const storedGoals = localStorage.getItem("goals");
  if (storedGoals) {
    return JSON.parse(storedGoals);
  }
  return [];
}

function saveGoals(goals) {
  localStorage.setItem("goals", JSON.stringify(goals));
}

function renderItem(item) {
  const newItem = document.createElement("li");
  newItem.textContent = item.value;
  newItem.dataset.id = item.id;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.classList.add("js-delete-button");
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

let goals = loadGoals();
renderList(goals);

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const textInput = createForm.elements.toDo;
  const newItem = { value: textInput.value, id: Date.now() };
  console.log(newItem);
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
