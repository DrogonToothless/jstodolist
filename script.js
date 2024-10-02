import domVariables from "./variables.js";
function addList() {
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