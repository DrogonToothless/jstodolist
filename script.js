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
            }
        }
    }
}
