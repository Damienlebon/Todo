const form = document.querySelector("form");
const container = document.querySelector(".container");
const taskInput = document.querySelector("#taskInput");
  //   Méthode 1
  //   container.innerHTML += `
  //     <div class="task">
  //       <p>Lorem, ipsum dolor</p>
  //       <button>delete</button>
  //     </div>`;

  // Méthode 2
function createTaskElement(taskText) {
  const task = document.createElement("div");
  task.classList.add("task");
  
  const p = document.createElement("p");
  const button = document.createElement("button");
  button.innerText = "delete";

  task.appendChild(p);
  p.innerText = taskText;
  task.appendChild(button);

//  delete task individually
  button.addEventListener("click", function () {
    container.removeChild(task);
    removeTask(taskText);
  });

  return task;
}

// add task to cache (local storage) : persist data

loadTasks();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskText = taskInput.value;
  const task = createTaskElement(taskText);
  container.appendChild(task);

  // clear input after submit
  taskInput.value = "";

  saveTask(taskText);
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function (taskText) {
      const task = createTaskElement(taskText);
      container.appendChild(task);
    });
  }
  
  
  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  saveTasks(tasks);
}


function removeTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const index = tasks.indexOf(taskText);
  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasks(tasks);
  }
}