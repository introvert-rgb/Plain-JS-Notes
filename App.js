let input = document.querySelector(".mainInput");

let wholeArray=[];
//how task gets added
input.addEventListener("change", (e) => {
  let inputVal = e.target.value;
   let taskArray = [];
 taskArray.push(inputVal);
 wholeArray.push(inputVal);
  
  taskArray.map((val) => {
        createTask(val);
        
  });
input.value=''; // resets the input field
  
});

// task creation

function createTask(value) {
  let task = `
     <div class="taskContainer">
        <div class="taskCheckContainer">
            <div class="taskChecked none"></div>
            <div class="taskCheck"></div>
        </div>
        <div class="taskData">${value}</div>
        </div>
    `;

  let taskContainer = document.querySelector(".bottomPart");
  taskContainer.insertAdjacentHTML("beforeend", task);
  
}
