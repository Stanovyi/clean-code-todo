const taskInput = document.getElementById("new-task");
const addButton = document.querySelector("button");
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");

function createNewTaskElement(taskString) {
  const listItem = document.createElement("li");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";

  const label = document.createElement("label");
  label.innerText = taskString;
  label.className = "task";

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task";

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit";

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

function addTask() {
  if (!taskInput.value) return;

  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);

  taskInput.value = "";
}

function editTask() {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("editMode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
}

function deleteTask() {
  const listItem = this.parentNode;
  const list = listItem.parentNode;
  list.removeChild(listItem);
}

function markTaskCompleted() {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, markTaskIncomplete);
}

function markTaskIncomplete() {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (const listItem of incompleteTaskHolder.children) {
  bindTaskEvents(listItem, markTaskCompleted);
}

for (const listItem of completedTasksHolder.children) {
  bindTaskEvents(listItem, markTaskIncomplete);
}

addButton.addEventListener("click", addTask);
