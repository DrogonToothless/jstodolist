let listSelectors = JSON.parse(localStorage.getItem('listSelectors')) || [];
let tasks = JSON.parse(localStorage.getItem('tasks')) || {};
function safeId(name) {
    return name.replace(/\s+/g, '-').toLowerCase();
}
function addList() {
    let input = document.createElement("input");
    input.id = "titleinput";
    const listsGroup = document.getElementById("lists-group");
    listsGroup.appendChild(input);
    input.addEventListener("keypress", function createList(event) {
        if (event.key === "Enter") {
            let inputValue = input.value.trim();
            if (!inputValue) return;
            listsGroup.removeChild(input);
            if (!listSelectors.includes(inputValue)) {
                listSelectors.push(inputValue);
                tasks[inputValue] = [];
                saveToLocalStorage();
            }
            addListToDOM(inputValue);
        }
    });
}
function addListToDOM(name) {
    const listsGroup = document.getElementById("lists-group");
    const listBody = document.getElementById("list-body");
    let listSelector = document.createElement("div");
    listSelector.id = `list-selector-${safeId(name)}`;
    listSelector.textContent = name;
    listsGroup.appendChild(listSelector);
    let newList = document.createElement("div");
    newList.classList.add("list");
    newList.id = `list-${safeId(name)}`;
    newList.innerHTML = `
        <h1>${name}</h1>
        <button onclick="addTask('${name}')">
            <span class="material-symbols-outlined">add</span>
        </button>
        <ul id="task-list-${safeId(name)}"></ul>
        <button onclick="deleteList('${name}')">
            <span class="material-symbols-outlined">delete</span>
        </button>
    `;
    listBody.appendChild(newList);
}
function addTask(listName) {
    let taskInput = document.createElement("input");
    taskInput.placeholder = "New Task";
    const taskList = document.getElementById(`task-list-${safeId(listName)}`);
    taskList.appendChild(taskInput);
    taskInput.addEventListener("keypress", function appendTask(event) {
        if (event.key === "Enter") {
            let taskValue = taskInput.value.trim();
            if (!taskValue) return;
            const taskId = `${listName}-${Date.now()}`;
            let li = document.createElement("li");
            li.id = taskId;
            li.textContent = taskValue;
            let deleteTaskButton = document.createElement("button");
            deleteTaskButton.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
            deleteTaskButton.onclick = () => deleteTask(taskId, listName);
            li.appendChild(deleteTaskButton);
            taskList.appendChild(li);
            tasks[listName].push({ id: taskId, value: taskValue });
            saveToLocalStorage();
            taskInput.remove();
        }
    });
}
function deleteTask(taskId, listName) {
    const taskList = document.getElementById(`task-list-${safeId(listName)}`);
    const taskElement = document.getElementById(taskId);
    if (taskElement) taskList.removeChild(taskElement);
    tasks[listName] = tasks[listName].filter(task => task.id !== taskId);
    saveToLocalStorage();
}
function deleteList(listName) {
    const listBody = document.getElementById("list-body");
    const listToRemove = document.getElementById(`list-${safeId(listName)}`);
    if (listToRemove) listBody.removeChild(listToRemove);
    const listsGroup = document.getElementById("lists-group");
    const listSelectorToRemove = document.getElementById(`list-selector-${safeId(listName)}`);
    if (listSelectorToRemove) listsGroup.removeChild(listSelectorToRemove);
    listSelectors = listSelectors.filter(selector => selector !== listName);
    delete tasks[listName];
    saveToLocalStorage();
}
function loadStorage() {
    listSelectors.forEach(selector => {
        if (!tasks[selector]) tasks[selector] = [];
        addListToDOM(selector);
        loadTasksToDOM(selector, tasks[selector]);
    });
}
function loadTasksToDOM(listName, taskArray) {
    const taskList = document.getElementById(`task-list-${safeId(listName)}`);
    taskArray.forEach(task => {
        let li = document.createElement("li");
        li.id = task.id;
        li.textContent = task.value;
        let deleteTaskButton = document.createElement("button");
        deleteTaskButton.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
        deleteTaskButton.onclick = () => deleteTask(task.id, listName);

        li.appendChild(deleteTaskButton);
        taskList.appendChild(li);
    });
}
function saveToLocalStorage() {
    localStorage.setItem('listSelectors', JSON.stringify(listSelectors));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
window.onload = function () {
    loadStorage();
};