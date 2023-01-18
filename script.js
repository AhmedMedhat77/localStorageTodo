// selectors
const todoInput = document.querySelector(".todo-input");
const todoBtton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".todos-filter");
// event Listiners

// Add todo
todoBtton.addEventListener("click", addTodo);

// checkDelete
todoList.addEventListener("click", deleteCheck);

// filter option
filterOption.addEventListener("click", filterTodo);

// Functions

// add Todo
function addTodo(e) {
  e.preventDefault();
  //create todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create New Todo
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

//Add todo to Local Storage

  saveLocalTodos(todoInput.value);

  // Add todo buttons

  // create Delet button
  const trashBtn = document.createElement("button");
  trashBtn.classList.add("trash-button");
  trashBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  // create check button
  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete-button");
  completeBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
  // append buttons to todo Div
  todoDiv.append(completeBtn, trashBtn);
  // append todo div to todo list
  todoList.append(todoDiv);
  //    make the input field clear Again
  todoInput.value = "";
}

// Checker Function

function deleteCheck(e) {
  const item = e.target;

  // delete todo
  if (item.classList[0] === "trash-button") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// filter Option

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// save to Local Storage

function saveLocalTodos(todo) {
  // check if there is local storage Todo !
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}
