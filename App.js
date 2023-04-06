let input = document.querySelector(".mainInput");
let filterOptions=document.querySelector(".taskFilters");


document.addEventListener('DOMContentLoaded', showSavedToDos)


 
//how task gets added
input.addEventListener("change", (e) => {
  let inputVal = e.target.value;


 let taskArray = [];
  taskArray.push(inputVal);
 

  taskArray.map((val) => {
    createTask(val);
  });

  
    // resets the input field
  input.value = "";
if(taskArray.length>0) filterOptions.classList.remove('none');
else filterOptions.classList.add("none");

saveLocalTodos(inputVal);
updateItemCount(document.querySelectorAll('.active').length)
 
});



// task creation

function createTask(value, state='false') {
 let task=document.createElement('div');
 task.classList.add('taskContainer');
 task.innerHTML = `
 <div class="taskCheckContainer " ischecked=${state}>
            <div class="taskChecked none" ></div>
            <div class="taskCheck"></div>
        </div>
        <div class="taskData active" >${value}</div>
       
         <div class="cross ">
                <span class="cross01"></span>
                <span class="cross02"></span>
            </div>`;
 


  let taskContainer = document.querySelector(".bottomPart");
  taskContainer.appendChild(task);



  
  task.querySelector('.taskCheckContainer').addEventListener('click',()=>{
     let getValue = JSON.parse(task
       .querySelector(".taskCheckContainer")
       .getAttribute("isChecked"));

   function setValue(val) {
     return task
       .querySelector(".taskCheckContainer")
       .setAttribute("isChecked", `${val}`);
   }
 


if(getValue){
  task.querySelector(".taskCheckContainer").classList.add("notChecked");
   task.querySelector(".taskChecked").classList.add("none");
   task.querySelector(".taskData").classList.replace("completed","active");
  updateItemCount(document.querySelectorAll(".active").length);
  setValue(false);
   
   
}else{
  task.querySelector(".taskCheckContainer").classList.remove("notChecked");
  task.querySelector(".taskChecked").classList.remove("none");
  task.querySelector(".taskData").classList.replace("active","completed")
  updateItemCount(document.querySelectorAll(".active").length);
  setValue(true);
}
  })

  task.querySelector(".taskData").addEventListener("click", () => {
    if (
      task.querySelector(".taskCheckContainer").classList.contains("notChecked")
    ) {
      task.querySelector(".taskCheckContainer").classList.remove("notChecked");
      task.querySelector(".taskChecked").classList.remove("none");
      task.querySelector(".taskData").classList.add("completed");
    } else {
      task.querySelector(".taskCheckContainer").classList.add("notChecked");
      task.querySelector(".taskChecked").classList.add("none");
      task.querySelector(".taskData").classList.remove("completed");
    }
  });


task.querySelector(".cross").addEventListener("click", () => {
  
  deleteTodos(task.children[1].innerHTML);
  taskContainer.removeChild(task);
});


}

// Update item count
function updateItemCount(val){
    let itemLeft=document.querySelector('.itemsLeft');
    itemLeft.innerHTML=val>1? `${val} Items Left`:`${val} Item Left`
}


function saveLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos')===null){
    todos=[];
  }
  else{
    todos=JSON.parse(localStorage.getItem('todos'))
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todos)
}
function showSavedToDos(){
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.map((val)=>{
      updateTask(val);
    });
    if (todos.length > 0) filterOptions.classList.remove("none");
else filterOptions.classList.add("none");
  }
console.log(todos);
updateItemCount(document.querySelectorAll(".active").length);

}


function deleteTodos(value) {
   let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.splice(todos.indexOf(value),1);

 localStorage.setItem('todos',JSON.stringify(todos));
if (todos.length > 0) filterOptions.classList.remove("none");
else filterOptions.classList.add("none");

console.log(todos);
}




function updateTask(value, state='false') {
 let task=document.createElement('div');
 task.classList.add('taskContainer');
 task.innerHTML = `
 <div class="taskCheckContainer " ischecked=${state}>
            <div class="taskChecked none" ></div>
            <div class="taskCheck"></div>
        </div>
        <div class="taskData active" >${value}</div>
       
         <div class="cross">
                <span class="cross01"></span>
                <span class="cross02"></span>
            </div>`;
 


  let taskContainer = document.querySelector(".bottomPart");
  taskContainer.appendChild(task);


  task.querySelector(".taskCheckContainer").addEventListener("click", () => {
    let getValue = JSON.parse(
      task.querySelector(".taskCheckContainer").getAttribute("isChecked")
    );

    function setValue(val) {
      return task
        .querySelector(".taskCheckContainer")
        .setAttribute("isChecked", `${val}`);
    }

    if (getValue) {
      task.querySelector(".taskCheckContainer").classList.add("notChecked");
      task.querySelector(".taskChecked").classList.add("none");
      task.querySelector(".taskData").classList.replace("completed","active");
      updateItemCount(document.querySelectorAll(".active").length);
      setValue(false);
    } else {
      task.querySelector(".taskCheckContainer").classList.remove("notChecked");
      task.querySelector(".taskChecked").classList.remove("none");
      task.querySelector(".taskData").classList.replace("active","completed");
updateItemCount(document.querySelectorAll(".active").length);
      setValue(true);
    }
  });

  task.querySelector(".taskData").addEventListener("click", () => {
    if (
      task.querySelector(".taskCheckContainer").classList.contains("notChecked")
    ) {
      task.querySelector(".taskCheckContainer").classList.remove("notChecked");
      task.querySelector(".taskChecked").classList.remove("none");
      task.querySelector(".taskData").classList.add("completed");
    } else {
      task.querySelector(".taskCheckContainer").classList.add("notChecked");
      task.querySelector(".taskChecked").classList.add("none");
      task.querySelector(".taskData").classList.remove("completed");
    }
  });
  

task.querySelector(".cross").addEventListener("click", () => {
  deleteTodos(task.children[1].innerHTML);
  taskContainer.removeChild(task);
  
});
 


}
