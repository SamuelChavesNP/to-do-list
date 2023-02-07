const todoForm = document.querySelector('#form');
const todoInput = document.querySelector('#input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEdtiion = document.querySelector('.cancel-edit');
const searchInput = document.querySelector('#search-input');
const select = document.querySelector('#select-filter');
const todos = document.querySelectorAll('.todo');
let oldInputValue;

const selectFilter = () => {
  const value = select.options[select.selectedIndex].text; 
  // pega o valor do select selecionado
  valueFilter = value.toLowerCase();
  const todos = document.querySelectorAll('.todo'); 
  if (valueFilter === 'todas'){
    todos.forEach((todo) => {
      todo.style.display = "flex";
    })
  }

  if (valueFilter === 'feitos') {
    todos.forEach((todo) => {
     if (todo.classList.contains('done')){
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
        // se o todo não tiver a classe 'done', esconde ele
      }
    })  
  }
  
  if (valueFilter === 'a fazer') {
    todos.forEach((todo) => {
      if (!todo.classList.contains('done')){
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
        // se o todo não tiver a classe 'done', mostra ele
      }
    })
  }
}

// quando o select mudar, ativar a funçao:
select.addEventListener('change', selectFilter);


const updateTodo = (text) => {
  todos.forEach((todo) => {
    let todoTitle = todo.querySelector('h3');
    
    if(todoTitle.innerText === oldInputValue){
      todoTitle.innerText = text;
    }
  })
}

const toggleForms = () => {
  todoForm.classList.toggle('hide');
  todoList.classList.toggle('hide');
  editForm.classList.toggle('hide');
  //esconde o formulario, a lista de tarefa, e mostra o formulário de edição
}

const saveTodo = (text) => {
  const todo = document.createElement('div');
  todo.classList.add('todo');
  // cria a div .todo

  // cria um h3, que recebe o texto do input, e é colocado como filho da div .todo
  const todoTitle = document.createElement('h3');
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  // cria os botoes, com as suas respectivas classes e icones, e adiciona os botões como filhos da div .todo
  const doneBtn = document.createElement('button');
  doneBtn.classList.add('finish');
  doneBtn.innerText = '✓'
  todo.appendChild(doneBtn);

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit');
  editBtn.innerText = '✎'
  todo.appendChild(editBtn);

  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove');
  removeBtn.innerText = '🗑'
  todo.appendChild(removeBtn);

  todoList.appendChild(todo); 
  todoInput.value = ""; // após executar a função, limpa o input
  todoInput.focus(); // foca no input novamente 
 }

  
const filterTask = () => {
  let inputValue = searchInput.value;
    todos.forEach((todo) => {
      // pega o que está escrito em cada todo
      let filterText = todo.innerText.toLowerCase();
      // pega o que está escrito no SearchInput
      let inputText = inputValue.toLowerCase();
      // compara o que está no searchInput com o que está em todos os todo
      if(!filterText.includes(inputText)){
        todo.style.display = "none";
      }
      else {
        todo.style.display = "flex";
      }
     } )
  }


  searchInput.addEventListener('input', filterTask);


// toda vez que der o submit no botão, o valor do input é enviado para a função saveTodo
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = todoInput.value;
  if(inputValue){
  saveTodo(inputValue);
  }
})


document.addEventListener('click', (event) => {
  const target = event.target;  
  const elementoPai = target.closest('div'); //div mais perto do target
  let todoTitle;

  if
    (elementoPai && elementoPai.querySelector('h3')){
      todoTitle = elementoPai.querySelector('h3').innerText;
    }
  if
    (target.classList.contains('finish')) {
      elementoPai.classList.toggle('done');
  } if
      (target.classList.contains('remove')) {
        elementoPai.remove();
  } if 
      (target.classList.contains('edit')) {
        toggleForms(); 
        
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
  }
})

cancelEdtiion.addEventListener('click', (event) => {
  event.preventDefault();
  toggleForms();
})

editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const editInputValue = editInput.value; // pega o valor do input de edit
  if(editInputValue){
    updateTodo(editInputValue); // se existir algo no input, ativar a função de atualizar
    toggleForms();  }
})



