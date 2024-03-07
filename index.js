let todoList = []
const addItem = document.querySelector("#add_field")
const addBTN = document.querySelector("#add-btn")
const ulList = document.querySelector("#todo-list")
// const saveBTN = document.querySelector(".save_btn")
// console.log(saveBTN)
// const taskInput = document.querySelector(".task_input")
// const taskLabel = document.querySelector(".task_label")


// ADD BUTTON
addBTN.addEventListener("click", function() {
    if(addItem.value != "") {
        const newItem = {
            id: todoList.length + 1,
            name: addItem.value,
            completed: false
        }
    todoList.unshift(newItem)
    console.log(newItem)
    }
    addItem.value = ""
    renderList(todoList)
})

// DISPLAYING INPUT LIST ITEM
function renderList(list) {
    let listItems = ""
    for (item of list) {
        listItems += TodoItemComponent(item)
        // console.log(item)
    }
    ulList.innerHTML = listItems

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', function() {
        const id = parseInt(this.id.replace('item', ''));
        const todoItem = todoList.find(item => item.id === id);
        todoItem.completed = this.checked;

        todoList.splice(index, 1)
        todoList.push(todoItem)
        renderList(todoList);
    });
});

}

// CREATING THE LIST ITEMS AND BUTTONS
function TodoItemComponent(todoItem){
    const checked = todoItem.completed ? "checked" : ""
    return`<li>
            <span>
                <input class="todo__input" name="item${todoItem.id}" id="item${todoItem.id}" type="checkbox" ${checked}/>
                <label class="todo__label" for="item${todoItem.id}">${todoItem.name} </label>
            </span>
            <button class="todo__edit" id="edit-${todoItem.id}" onclick="editTodo(${todoItem.id})">Edit</button>
            <button class="todo__delete" id="delete-${todoItem.id}" onclick="deleteTodo(${todoItem.id})">Delete</button>
        </li>`
}

// EDIT BUTTON
function editTodo(id){
    const editBTN = document.querySelector(`#edit-${id}`)
    const targetItem = todoList.find(item => item.id === id)
    const taskLabel = document.querySelector(`label[for=item${id}]`)
    if(targetItem.completed === false) {
        taskLabel.contentEditable = true
    taskLabel.focus()
    editBTN.textContent = "Save"
    }


    taskLabel.addEventListener("blur", function() {
        targetItem.name = taskLabel.textContent
        console.log(todoList)
        renderList(todoList)
    })

}

// DELETE BUTTON
function deleteTodo(id){
    const targetIndex = todoList.findIndex(item => item.id === id)
    todoList.splice(targetIndex, 1)
    renderList(todoList)
}


// window.addEventListener("load", function () {
//   console.log(document);
//   console.log(document.getElementById("add-btn"));
// });
