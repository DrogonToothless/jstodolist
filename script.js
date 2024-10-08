function addList() {
    const listsGroup = document.getElementById("lists-group");
    const titleEntry = document.createElement("input");
    titleEntry.type = "text";
    listsGroup.appendChild(titleEntry);
    titleEntry.addEventListener("keypress", createList);
    function createList(event) {
        if (event.key === "Enter") {
            let listName = titleEntry.value.trim();
            if (listName) {
                let savedLists = JSON.parse(localStorage.getItem("savedlist")) || [];
                if (savedLists.includes(listName)) {
                    alert("List name already exists. Please choose a different name.");
                    return;
                }
                let newList = document.createElement("div");
                newList.className = "list";
                newList.id = listName;
                newList.textContent = listName;
                listsGroup.appendChild(newList);
                listsGroup.removeChild(titleEntry);
                savedLists.push(listName);
                localStorage.setItem("savedlist", JSON.stringify(savedLists));
                const listBody = document.getElementById("list-body");
                let mainList = document.createElement("div");
                mainList.classList = "main-list";
                mainList.id = "main-list" + listName;
                mainList.innerHTML = `
                        <h1>${listName}</h1>
                        <button onclick="createTask('${listName}')">
                            <span class="material-symbols-outlined">add</span>
                        </button>
                `;
                listBody.appendChild(mainList);
                let savedMainLists = JSON.parse(localStorage.getItem("savedmainlist")) || [];
                savedMainLists.push(listName);
                localStorage.setItem("savedmainlist", JSON.stringify(savedMainLists));
            }
        }
    }
}
function retrieveSavedData() {
    const listsGroup = document.getElementById("lists-group");
    const listBody = document.getElementById("list-body");
    let savedLists = [];
    let savedMainLists = [];
    try {
        const rawSavedLists = localStorage.getItem("savedlist");
        savedLists = rawSavedLists ? JSON.parse(rawSavedLists) : [];
    } catch (error) {
        console.error("Invalid JSON in savedlist. Resetting data.", error);
        localStorage.removeItem('savedlist');
        savedLists = [];
    }
    try {
        const rawSavedMainLists = localStorage.getItem("savedmainlist");
        savedMainLists = rawSavedMainLists ? JSON.parse(rawSavedMainLists) : [];
    } catch (error) {
        console.error("Invalid JSON in savedmainlist. Resetting data.", error);
        localStorage.removeItem('savedmainlist');
        savedMainLists = [];
    }
    savedLists.forEach(listName => {
        let retrievedList = document.createElement("div");
        retrievedList.className = "list";
        retrievedList.id = listName;
        retrievedList.textContent = listName;
        listsGroup.appendChild(retrievedList);
    });
    savedMainLists.forEach(mainListName => {
        let retrievedMainList = document.createElement("div");
        retrievedMainList.classList = "main-list";
        retrievedMainList.id = "main-list-" + mainListName;
        retrievedMainList.innerHTML = `
                <h1>${mainListName}</h1>
                <button onclick="createTask()">
                    <span class="material-symbols-outlined">add</span>
                </button>
        `;
        listBody.appendChild(retrievedMainList);
    });
}
document.addEventListener("DOMContentLoaded", retrieveSavedData);