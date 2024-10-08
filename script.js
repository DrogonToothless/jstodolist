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
                let newList = document.createElement("div");
                newList.className = "list";
                newList.id = listName;
                newList.textContent = listName;
                listsGroup.appendChild(newList);
                listsGroup.removeChild(titleEntry);
                localStorage.setItem("savedlist", listName);
                let savedlist = localStorage.getItem("savedlist");
                console.log(savedlist);
                newList.addEventListener("click", toList);
                const listBody = document.getElementById("list-body");
                let mainList = document.createElement("div");
                mainList.classList = "main-list"
                const mainListName = listName;
                mainList.innerHTML = 
                `
                <div id="main-list-${listName}">
                    <h1>${listName}</h1>
                    <button onclick="createTask()">
                        <span class="material-symbols-outlined">add</span>
                    </button>
                </div>
                `;
                listBody.appendChild(mainList);
                localStorage.setItem("savedmainlist", mainListName);
                let savedmainlist = localStorage.getItem("savedmainlist");
                console.log(savedmainlist);
                function toList() {
                    
                }
            }
        }
    }
}
function retrieveSavedData() {
    const savedlist = localStorage.getItem("savedlist");
    const savedmainlist = localStorage.getItem("savedmainlist");
    const listsGroup = document.getElementById("lists-group");
    const listBody = document.getElementById("list-body");
    if (savedlist && savedmainlist) {
        let retrievedList = document.createElement("div");
        retrievedList.className = "list";
        retrievedList.id = savedlist;
        retrievedList.textContent = savedlist;
        listsGroup.appendChild(retrievedList);
        let retrievedMainList = document.createElement("div");
        retrievedMainList.classList = "main-list";
        retrievedMainList.innerHTML = 
        `<div id="main-list-${savedmainlist}">
            <h1>${savedmainlist}</h1>
            <button onclick="createTask()">
                <span class="material-symbols-outlined">add</span>
            </button>
        </div>`;
        listBody.appendChild(retrievedMainList);
    }
}
document.addEventListener("DOMContentLoaded", retrieveSavedData);