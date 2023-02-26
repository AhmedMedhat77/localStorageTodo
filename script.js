// selectors
const todoInput = document.querySelector(".todo-input");
const todoBtton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".todos-filter");
// event Listiners

window.onload = () => {
  if (localStorage.getItem("todos") === null) {
    localStorage.setItem("todos", []);
  } else {
    let x = window.localStorage.getItem("todos");
    JSON.parse(x).map((todo) => {
      createTodo(todo.input);
    });
  }
};

// Add todo
todoBtton.addEventListener("click", addTodo);

// checkDelete
todoList.addEventListener("click", (e) => {
  deleteCheck(e);
});

// filter option
filterOption.addEventListener("click", filterTodo);

// Functions
let todos = [];

function createTodo(todoInput) {
  const TodoValues = {
    input: todoInput,
    id: Math.floor(Math.random() * 10000),
    isCompleted: false,
  };

  todos.push(TodoValues);

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.setAttribute("id", TodoValues.id);
  // create New Todo
  const newTodo = document.createElement("li");
  newTodo.textContent = TodoValues.input;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // create Delet button
  const trashBtn = document.createElement("button");
  trashBtn.classList.add("trash-button");
  trashBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  trashBtn.onclick = deleteCheck;
  // create check button
  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete-button");
  completeBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
  // append buttons to todo Div
  todoDiv.append(completeBtn, trashBtn);
  // append todo div to todo list
  todoList.append(todoDiv);
}

// add Todo
function addTodo(e) {
  e.preventDefault();
  createTodo(todoInput.value);
  saveToLocalStorage(todos);
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
      let filterd = todos.filter(
        (todo) => todo.id !== Number(item.parentElement.id)
      );
      window.localStorage.setItem("todos", JSON.stringify(filterd));
      todo.remove();
      todos = filterd;
    });
    if (item.classList[0] === "complete-button") {
      const todo = item.parentElement;
      todo.classList.toggle("completed");
    }
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
  let todos = [];

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);

  localStorage.setItem("todos", [JSON.stringify(todos)]);
}

function saveToLocalStorage(todo) {
  localStorage.setItem("todos", JSON.stringify(todo));
}
