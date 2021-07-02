const form = document.querySelector('#task-form');
const myList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');


// Load event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);


    // Add task event 
    form.addEventListener('submit', addTask);

    // Romove task event
    myList.addEventListener('click', removeTask);

    // Clear task event
    clearBtn.addEventListener('click', clearTasks);

}
// Get Tasks from Local storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // Create li
        const li = document.createElement('li')

        // Add class
        li.className = 'list-group-item';

        // create text node
        li.appendChild(document.createTextNode(task))

        // Create link
        const link = document.createElement('a');

        // Add class
        link.className = 'delete-item  ';

        // Add Html icon
        link.innerHTML = '<i class="fas fa-trash"></i>';

        // Append link to li
        li.appendChild(link);

        //  Append li to ul
        myList.appendChild(li);


    });
}


// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Please ,Add Task');
        return;
    }

    // Create li
    const li = document.createElement('li')

    // Add class
    li.className = 'list-group-item';

    // create text node
    li.appendChild(document.createTextNode(taskInput.value))

    // Create link
    const link = document.createElement('a');

    // Add class
    link.className = 'delete-item  ';

    // Add Html icon
    link.innerHTML = '<i class="fas fa-trash"></i>';

    // Append link to li
    li.appendChild(link);

    //  Append li to ul
    myList.appendChild(li);


    // Store in Local storage
    storeTaskInLocalStorage(taskInput.value);


    // clear task input
    taskInput.value = '';


    // e.preventDefault
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (alert('Are you sure?')) {
            return;
        }
        e.target.parentElement.parentElement.remove();

        // Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);

    }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Clear Tasks
function clearTasks() {
    myList.innerHTML = '';


    // Clear from local storage
    clearTasksFromLocalStorage();

}

// Clear Task from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}