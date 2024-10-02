function addList() {
    const addListButton = document.getElementById("addlist");
    const listsGroup = document.getElementById("lists-group");
    const newList = document.createElement("div");
    const listTitle = document.createElement("input");
    listTitle.id = "title-input";
    listsGroup.appendChild(newList);
    newList.appendChild(listTitle);
    addListButton.addEventListener("keypress", addName);
    function addName(event) {
        if (event.key === "Enter") {
            const newTitle = listTitle.value;
            newList.textContent = newTitle;
        }
    }
}
