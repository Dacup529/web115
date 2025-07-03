//Reese Parker 2118500
//WEB 115 0001

//Get references to form and task display container
const taskForm = document.getElementById("taskForm");
const taskManagerDiv = document.getElementById("taskmanager");

//Initialize empty array to store tasks
let tasks = [];

//Handle form submission
taskForm.addEventListener("submit", function (e){
    e.preventDefault(); //Prevent page reload on submit

    //Get form values
    const name = document.getElementById("taskName").value.trim();
    const priority = document.getElementById("taskPriority").value;
    const isImportant = document.getElementById("taskImportant").checked;
    const isCompleted = document.getElementById("taskCompleted").checked;
    const date = new Date().toLocaleString();

    //Input validation
    if (!name) {
        alert("Task name cannot be empty.");
        return;
    }

    //Create a new task object
    const newTask = {
        id: Date.now(),
        name,
        priority,
        isImportant,
        isCompleted,
        date,
    };

    //Add tasks to the array
    tasks.push(newTask);

    //Log current tasks to complete
    console.log(JSON.stringify(tasks));
    renderTasks();

    //Reset the form fields
    taskForm.reset();
});

//Render all tasks in the DOM
function renderTasks() {
    taskManagerDiv.innerHTML = "";

    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        //Add conditional styling
        if (task.isImportant) taskDiv.classList.add("important");
        if (task.isCompleted) taskDiv.classList.add("completed");
        
        //Set InnerHTML of task box
        taskDiv.innerHTML = `
        <strong>${task.name}</strong><br/>
        <small>Priority: ${task.priority}</small><br/>
        <small>Added: ${task.date}</small><br/>
        <label><input type="checkbox" class="toggleComplete" data-id="${task.id}" ${task.isCompleted ? "checked" : ""}/> Completed</label>
        <span class="delete" data-id="${task.id}">Delete</span>
        `;

        //Append task to the taskManagerDiv
        taskManagerDiv.appendChild(taskDiv);
    });
    //Add event listener to all delete buttons
    document.querySelectorAll(".delete").forEach(btn => {
        btn.addEventListener("click", function(){
            const id = parseInt(this.dataset.id);
            tasks = tasks.filter(task => task.id !== id);
            console.log(JSON.stringify(tasks));
            renderTasks();
        });
    });
    //Add event listener to all toggle completion checkboxes
    document.querySelectorAll(".toggleComplete").forEach(cb => {
        cb.addEventListener("change", function (){
            const id = parseInt(this.dataset.id);
            const task = tasks.find(t => t.id === id);
            task.isCompleted = this.checked;
            console.log(JSON.stringify(tasks));
            renderTasks();
        });
    });
}