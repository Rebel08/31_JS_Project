const todoForm = document.querySelector(".todo-form");
const inputText = document.querySelector(".todo-form input[type='text'] ");
const todoList = document.querySelector(".todo-list");

const handleSummit=(e)=>{
     e.preventDefault();
     const innerValue = inputText.value;
     const newLi = document.createElement("li");
     newLi.innerHTML=`<span class="todo-text">${innerValue}</span>
          <div class="todo-buttons">
            <button class="todo-btn edit">🖊️</button>
            <button class="todo-btn done">✔️</button>
            <button class="todo-btn remove">❌</button>
          </div>`;
    todoList.append(newLi);
    inputText.value="";
}
const handleButton =(e)=>{
   const button = e.target;
   if(button.classList.contains("remove")){
      const targetLi = button.parentNode.parentNode;
      targetLi.remove();
   }
   if(button.classList.contains("done")){
      const textSpan = button.parentNode.previousElementSibling;
      textSpan.style.textDecoration = "Line-through";
   }
   if(button.classList.contains("edit")){
      const innerVal = button.parentNode.previousElementSibling.innerText;
      inputText.value = innerVal;
      inputText.focus();
      const targetLi = button.parentNode.parentNode;
      targetLi.remove();
   }
}

todoForm.addEventListener("submit",handleSummit);
todoList.addEventListener("click",handleButton);