function addList() {
    const listsGroup = document.getElementById("lists-group");
    const newList = document.createElement("div");
    const listTitle = document.createElement("input");
    listTitle.id = "title-input";
    listsGroup.appendChild(newList);
    newList.appendChild(listTitle);
    listTitle.addEventListener("keypress", (addName));
    function addName(newList, listTitle) {
        if (event.keycode === 13) {
            const newTitle = listTitle.value;
            newList.textContent = newTitle;
        }
    }
}