function loadTodos() {
    //This function will load the todos from the local storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    todos.forEach((todo) => {
        const li = document.createElement("li");
        li.textContent = todo;
        taskList.appendChild(li);
    });

}

function addTodo() {
    //This function will add a new todo to the local storage
    const todoInput = document.getElementById("todoInput");
    const todoText = todoInput.value.trim();
    if (todoText === "") {
        return;
    }
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
    todoInput.value = "";
    loadTodos();
}

document.addEventListener("DOMContentLoaded", () => {
    
    
    loadTodos();
});


