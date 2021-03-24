//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".add-task__input");//Add a new task.
var addButton=document.querySelectorAll(".add-task__button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incompleteTasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    listItem.className="tasks__item"

    label.innerText=taskString;
    label.className='tasks__label';

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className="tasks__checkbox";
    editInput.type="text";
    editInput.className="tasks__input";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="tasks__button_edit button";

    deleteButton.className="tasks__button_delete button";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.className='tasks__image';
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");
    
    const listItem = this.parentNode;
    
    const editInput = listItem.querySelector(".tasks__input");
    const label = listItem.querySelector(".tasks__label");
    const editBtn = listItem.querySelector(".tasks__button_edit");
    const containsClass = listItem.classList.contains("tasks__item_edit-mode");
    //If class of the parent is .edit-mode
    if(containsClass){

        //switch to ..edit-mode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle ..edit-mode on the parent.
    listItem.classList.toggle("tasks__item_edit-mode");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");
    //Append the task list item to the #completed-tasks
    const listItem=this.parentNode;
    const listItemLabel = listItem.querySelector(".tasks__label");

    listItemLabel.classList.add("tasks__label_complited");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks.
    const listItem=this.parentNode;
    const listItemLabel = listItem.querySelector(".tasks__label");

    listItemLabel.classList.remove("tasks__label_complited")
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    const checkBox = taskListItem.querySelector(".tasks__checkbox");
    const editButton = taskListItem.querySelector(".tasks__button_edit") || '';
    const deleteButton = taskListItem.querySelector(".tasks__button_delete");

    //Bind editTask to edit button.
    editButton.onclick = editTask;
    // //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    // Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (const elem of incompleteTaskHolder.children) {
    bindTaskEvents(elem, taskCompleted);
}

for (const elem of completedTasksHolder.children) {
    bindTaskEvents(elem, taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.