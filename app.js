const taskInput = document.querySelector('#task');
const form = document.querySelector('#task-form');
const clearTaskBtn = document.querySelector('.clear-tasks');
const taskList = document.querySelector('.collection');
const filterTaskInput = document.querySelector('#filter');

loadEventListeners();

function loadEventListeners() {
  // Load Tasks from DOM
  document.addEventListener('DOMContentLoaded', loadTasksFromDOM);
  //
  form.addEventListener('submit', addTask);
  // Remove Tasks
  taskList.addEventListener('click', removeTask);
  // clear tasks
  clearTaskBtn.addEventListener('click', clearTask);
  // Add filter event
  filterTaskInput.addEventListener('keyup', filterTask);
}

function loadTasksFromDOM() {
  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task));
    li.className = 'collection-item';
    // create link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

// Load tasks from DOM

// Add new task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Enter Task!');
  }
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(taskInput.value));
  li.className = 'collection-item';
  // create link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);

  // add task to Local Storage
  addTaskToLS(taskInput.value);

  taskInput.value = '';
  e.preventDefault();
}
//
function addTaskToLS(task) {
  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// REMOVE TASK ITEM
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      removeTaskFromLS(e.target.parentElement.parentElement);
    }
  }
  // Remove task from Local storage
}
// Remove task form LS
function removeTaskFromLS(taskItem) {
  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (item, index) {
    if (taskItem.textContent === item) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// CLEAR TASKS
function clearTask() {
  // taskList.innerHTML = '';
  if (confirm('Are you sure?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
}

// Filter Task
function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// Added make file
