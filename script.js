const listSelectors = [];
const lists = [];
const tasks = {};
function addList() {
    let input = document.createElement("input");
    input.id = "titleinput";
    const listsGroup = document.getElementById("lists-group");
    listsGroup.appendChild(input);
    input.addEventListener("keypress", createList);
    function createList(event) {
        if (event.key === "Enter") {
            let inputValue = input.value.trim();
            if (!inputValue) return;
            listsGroup.removeChild(input);
            listSelectors.push(inputValue);
            lists.push(inputValue);
            tasks[inputValue] = [];
            let listSelector = document.createElement("div");
            listSelector.id = "list-selector-" + inputValue;
            listSelector.textContent = inputValue;
            listsGroup.appendChild(listSelector);
            const listBody = document.getElementById("list-body");
            let newList = document.createElement("div");
            newList.classList.add("list");
            newList.id = "list-" + inputValue;
            newList.innerHTML = `
                <h1>${inputValue}</h1>
                <button id="add-task" onclick="addTask('${inputValue}')">
                    <span class="material-symbols-outlined">add</span>
                </button>
                <ul id="task-list-${inputValue}">
                    <!-- Tasks will be added here -->
                </ul>
                <button id="delete-list" onclick="deleteList('${inputValue}')">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            `;
            listBody.appendChild(newList);
            saveToLocalStorage();
        }
    }
}
function addTask(listName) {
    let taskInput = document.createElement("input");
    taskInput.placeholder = "New Task";
    const taskList = document.getElementById(`task-list-${listName}`);
    taskList.appendChild(taskInput);
    taskInput.addEventListener("keypress", appendTask);
    function appendTask(event) {
        if (event.key === "Enter") {
            let taskValue = taskInput.value.trim();
            if (!taskValue) return;
            let li = document.createElement("li");
            li.textContent = taskValue;
            let deleteTaskButton = document.createElement("button");
            deleteTaskButton.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
            deleteTaskButton.onclick = () => deleteTask(li, listName);
            li.appendChild(deleteTaskButton);
            taskList.appendChild(li);
            if (!tasks[listName]) {
                tasks[listName] = [];
            }
            tasks[listName].push(taskValue);
            saveToLocalStorage();
            taskInput.value = "";
        }
    }
}
function deleteTask(taskElement, listName) {
    const taskList = document.getElementById(`task-list-${listName}`);
    if (!taskList) return;
    const taskValue = taskElement.firstChild.textContent;
    const taskIndex = tasks[listName].indexOf(taskValue);
    if (taskIndex > -1) {
        tasks[listName].splice(taskIndex, 1);
    }
    taskList.removeChild(taskElement);
    saveToLocalStorage();
}
function loadStorage() {
    const savedSelectors = JSON.parse(localStorage.getItem('listSelectors')) || [];
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    savedSelectors.forEach(selector => {
        addListFromStorage(selector, savedTasks[selector] || []);
    });
}
function safeId(name) {
    return name.replace(/\s+/g, '-').toLowerCase();
}
function addListFromStorage(name, taskArray) {
    const listsGroup = document.getElementById("lists-group");
    const listBody = document.getElementById("list-body");
    let listSelector = document.createElement("div");
    listSelector.id = "list-selector-" + safeId(name);
    listSelector.textContent = name;
    listsGroup.appendChild(listSelector);
    let newList = document.createElement("div");
    newList.classList.add("list");
    newList.id = "list-" + safeId(name);
    newList.innerHTML = `
        <h1>${name}</h1>
        <button onclick="addTask('${name}')"><span class="material-symbols-outlined">add</span></button>
        <ul id="task-list-${safeId(name)}"></ul>
        <button onclick="deleteList('${name}')"><span class="material-symbols-outlined">delete</span></button>
    `;
    listBody.appendChild(newList);
    taskArray.forEach(task => {
        const taskList = document.getElementById(`task-list-${safeId(name)}`);
        let li = document.createElement("li");
        li.textContent = task;
        let deleteTaskButton = document.createElement("button");
        deleteTaskButton.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
        deleteTaskButton.onclick = () => deleteTask(li, name);
        li.appendChild(deleteTaskButton);
        taskList.appendChild(li);
    });
}
function deleteList(listName) {
    const listBody = document.getElementById("list-body");
    const listToRemove = document.getElementById(`list-${listName}`);
    if (listToRemove) {
        listBody.removeChild(listToRemove);
    }
    const listsGroup = document.getElementById("lists-group");
    const listSelectorToRemove = document.getElementById(`list-selector-${listName}`);
    if (listSelectorToRemove) {
        listsGroup.removeChild(listSelectorToRemove);
    }
    const listIndex = lists.indexOf(listName);
    if (listIndex > -1) {
        lists.splice(listIndex, 1);
    }
    const selectorIndex = listSelectors.indexOf(listName);
    if (selectorIndex > -1) {
        listSelectors.splice(selectorIndex, 1);
    }
    delete tasks[listName];
    saveToLocalStorage();
}
function saveToLocalStorage() {
    localStorage.setItem('listSelectors', JSON.stringify(listSelectors));
    localStorage.setItem('lists', JSON.stringify(lists));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
window.onload = function() {
    loadStorage();
};