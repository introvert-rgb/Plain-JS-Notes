let input = document.querySelector(".mainInput");
let filterOptions = document.querySelector(".taskFilters");
let allBtn = document.querySelector(".allBtn");
let activeBtn = document.querySelector(".activeBtn");
let completeBtn = document.querySelector(".completeBtn");
let clearCompletedBtn = document.querySelector(".clearCompleted");


let mobileAllBtn = document.querySelector(".mobileAllBtn");
let mobileActiveBtn = document.querySelector(".mobileActiveBtn");
let mobileCompleteBtn = document.querySelector(".mobileCompleteBtn");

let icon = document.querySelector(".iconState");
let body = document.querySelector("body");

document.addEventListener("DOMContentLoaded", showSavedToDos);

//dark mode

icon.addEventListener("click", () => {
  document.querySelector("body").classList.toggle("dark");
  document.querySelector(".main").classList.toggle("darkBack");
  input.classList.toggle("darkTask");
  document.querySelector(".inputContainer").classList.toggle("darkTask");
  document.querySelector(".checkDiv").classList.toggle("darkTask");
  document.querySelector(".taskFilters").classList.toggle("darkTask");
   document.querySelector(".mobileTaskStates").classList.toggle("darkTask");

  if (body.classList.contains("dark")) {
    icon.setAttribute("src", "./images/icon-sun.svg");
    document.querySelector(".bottomPart").style.boxShadow = "none";
    document.querySelector(".taskFilters").style.boxShadow = "none";
    document.querySelector(".mobileTaskStates").style.boxShadow = "none";
  } else {
    icon.setAttribute("src", "./images/icon-moon.svg");
    document.querySelector(".bottomPart").removeAttribute("style");
    document.querySelector(".taskFilters").removeAttribute("style");
    document.querySelector(".mobileTaskStates").removeAttribute("style");
  }
  if (document.querySelectorAll(".taskContainer").length > 0) {
    document.querySelectorAll(".taskContainer").forEach((item) => {
      item.classList.toggle("darkTask");
    });
    document.querySelectorAll(".taskData").forEach((item) => {
      item.classList.toggle("darkTask");
    });
    document.querySelectorAll(".taskCheck").forEach((item) => {
      item.classList.toggle("darkTask");
    });
  }
});
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
  if(document.querySelector('body').classList.contains('dark')){
    if (document.querySelectorAll(".taskContainer").length > 0) {
      document.querySelectorAll(".taskContainer").forEach((item) => {
        item.classList.add("darkTask");
      });
      document.querySelectorAll(".taskData").forEach((item) => {
        item.classList.add("darkTask");
      });
      document.querySelectorAll(".taskCheck").forEach((item) => {
        item.classList.add("darkTask");
      });
    }
  }
  if (taskArray.length > 0){ filterOptions.classList.remove("none");
  document.querySelector(".mobileTaskStates").classList.remove("none");
}else {filterOptions.classList.add("none");
document.querySelector(".mobileTaskStates").classList.add("none");
}
  saveLocalTodos(inputVal);
  updateItemCount(document.querySelectorAll(".active").length);
});

// task creation

function createTask(value, state = "false") {
  let mainTaskContainer = document.createElement("div");
  mainTaskContainer.classList.add("mainTaskContainer");
  let task = document.createElement("div");
  task.classList.add("taskContainer");
  task.setAttribute("draggable", "true");
  task.innerHTML = `
 <div class="fix">
    <div class="taskCheckContainer " ischecked=${state}>
            <div class="taskChecked none" ></div>
            <div class="taskCheck"></div>
    </div>
    <div class="taskData active" >${value}</div>
  </div>
         <div class="cross">
                <span class="cross01"></span>
                <span class="cross02"></span>
            </div>`;

  mainTaskContainer.appendChild(task);
  let taskContainer = document.querySelector(".bottomPart");
  taskContainer.appendChild(mainTaskContainer);

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
      task.querySelector(".taskData").classList.replace("completed", "active");
      updateItemCount(document.querySelectorAll(".active").length);
      setValue(false);
    } else {
      task.querySelector(".taskCheckContainer").classList.remove("notChecked");
      task.querySelector(".taskChecked").classList.remove("none");
      task.querySelector(".taskData").classList.replace("active", "completed");
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
    taskContainer.removeChild(mainTaskContainer);
    updateItemCount(document.querySelectorAll(".active").length);
  });
}

// Update item count
function updateItemCount(val) {
  let itemLeft = document.querySelector(".itemsLeft");
  itemLeft.innerHTML = val > 1 ? `${val} Items Left` : `${val} Item Left`;
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function showSavedToDos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.map((val) => {
      updateTask(val);
    });
   if (todos.length > 0) {filterOptions.classList.remove("none");
document.querySelector('.mobileTaskStates').classList.remove('none');}
  else {filterOptions.classList.add("none");
document.querySelector(".mobileTaskStates").classList.add("none");}
}
  

  updateItemCount(document.querySelectorAll(".active").length);
}

function deleteTodos(value) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.splice(todos.indexOf(value), 1);

  localStorage.setItem("todos", JSON.stringify(todos));

  if (todos.length > 0) {filterOptions.classList.remove("none");
document.querySelector('.mobileTaskStates').classList.remove('none');}
  else {filterOptions.classList.add("none");
document.querySelector(".mobileTaskStates").classList.add("none");}
}

function updateTask(value, state = "false") {
  let mainTaskContainer = document.createElement("div");
  mainTaskContainer.classList.add("mainTaskContainer");
  let task = document.createElement("div");
  task.setAttribute("draggable", "true");
  task.classList.add("taskContainer");
  task.innerHTML = `
 <div class="fix">
    <div class="taskCheckContainer " ischecked=${state}>
            <div class="taskChecked none" ></div>
            <div class="taskCheck"></div>
    </div>
    <div class="taskData active" >${value}</div>
  </div>
         <div class="cross">
                <span class="cross01"></span>
                <span class="cross02"></span>
            </div>`;

  mainTaskContainer.appendChild(task);
  let taskContainer = document.querySelector(".bottomPart");
  taskContainer.appendChild(mainTaskContainer);

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
      task.querySelector(".taskData").classList.replace("completed", "active");
      updateItemCount(document.querySelectorAll(".active").length);
      setValue(false);
    } else {
      task.querySelector(".taskCheckContainer").classList.remove("notChecked");
      task.querySelector(".taskChecked").classList.remove("none");
      task.querySelector(".taskData").classList.replace("active", "completed");
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
    taskContainer.removeChild(mainTaskContainer);
    updateItemCount(document.querySelectorAll(".active").length);
  });
}

allBtn.addEventListener("click", () => {
  document.querySelectorAll(".completed").forEach((item) => {
    item.parentElement.parentElement.classList.remove("none");
  });
  document.querySelectorAll(".active").forEach((item) => {
    item.parentElement.parentElement.classList.remove("none");
  });
  
});
activeBtn.addEventListener("click", () => {
  if (document.querySelectorAll(".active").length == 0){
    return;
  }else{
    document.querySelectorAll(".completed").forEach((item) => {
      item.parentElement.parentElement.classList.add("none");
    });

  document.querySelectorAll(".active").forEach((item) => {
    item.parentElement.parentElement.classList.remove("none");
  });
}});

completeBtn.addEventListener("click", () => {
  if (document.querySelectorAll(".completed").length == 0) {
    console.log('hey')
    return;
  } else {console.log("hell no");
   
    document.querySelectorAll(".completed").forEach((item) => {
      item.parentElement.parentElement.classList.remove("none");
    });
     document.querySelectorAll(".active").forEach((item) => {
       item.parentElement.parentElement.classList.add("none");
     });
  }
});

clearCompletedBtn.addEventListener("click", () => {
  document.querySelectorAll(".completed").forEach((item) => {
    item.parentElement.parentElement.classList.add("none");

    deleteTodos(item.innerHTML);
  });

  document.querySelectorAll(".active").forEach((item) => {
    item.parentElement.parentElement.classList.remove("none");
  });
});


mobileAllBtn.addEventListener("click", () => {
  document.querySelectorAll(".completed").forEach((item) => {
    item.parentElement.parentElement.classList.remove("none");
  });
  document.querySelectorAll(".active").forEach((item) => {
    item.parentElement.parentElement.classList.remove("none");
  });
});
mobileActiveBtn.addEventListener("click", () => {
  if (document.querySelectorAll(".active").length == 0) {
    return;
  } else {
    document.querySelectorAll(".completed").forEach((item) => {
      item.parentElement.parentElement.classList.add("none");
    });

    document.querySelectorAll(".active").forEach((item) => {
      item.parentElement.parentElement.classList.remove("none");
    });
  }
});

mobileCompleteBtn.addEventListener("click", () => {
  if (document.querySelectorAll(".completed").length == 0) {
    console.log("hey");
    return;
  } else {
    console.log("hell no");

    document.querySelectorAll(".completed").forEach((item) => {
      item.parentElement.parentElement.classList.remove("none");
    });
    document.querySelectorAll(".active").forEach((item) => {
      item.parentElement.parentElement.classList.add("none");
    });
  }
});
