const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");

let taskCount = 0;

const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";

  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }

  const task = `<div class='task'>
  <input type='checkbox' class='task-check'/>
  <span class='taskname'>${taskName}</span>
  <button class="edit"><ion-icon name="create-outline"></ion-icon></button>
  <button class="delete"><ion-icon name="trash-outline"></ion-icon></button>
    </div>`;

  taskContainer.insertAdjacentHTML("beforeend", task);

  const deleteBtns = document.querySelectorAll(".delete");
  deleteBtns.forEach((button) => {
    button.onclick = () => {
      button.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
    };
  });

  const editBtns = document.querySelectorAll(".edit");
  editBtns.forEach((editbtn) => {
    editbtn.onclick = (e) => {
      let targetElement = e.target;

      if (!(e.target.className == "edit")) {
        targetElement = e.target.parentElement;
      }

      newTaskInput.value = targetElement.previousElementSibling?.innerText;
      targetElement.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
    };
  });

  const taskCheck = document.querySelectorAll(".task-check");
  taskCheck.forEach((checkbox) => {
    checkbox.onchange = () => {
      checkbox.nextElementSibling.classList.toggle("completed");
      if (checkbox.checked) {
        taskCheck -= 1;
      } else {
        taskCount += 1;
      }
      displayCount(taskCount);
    };
  });
  taskCount += 1;
  displayCount(taskCount);
  newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
  taskCount = 0;
  displayCount(taskCount);
  newTaskInput.value = "";
};
