const tasks = [
  {title: "Comprar comida para o gato", type: "Urgente"},
  {title: "Consertar Computador", type: "Importante"},
  {title: "Beber água", type: "Normal"},
  {title: "Enviar relatório trimestral", type: "Importante"},
  {title: "Fazer exercícios físicos", type: "Normal"},
  {title: "Agendar consulta médica", type: "Urgente"},
  {title: "Ler pelo menos um capítulo de um livro", type: "Normal"},
  {title: "Limpar a despensa", type: "Importante"},
  {title: "Pagar a conta de energia", type: "Urgente"},
  {title: "Assistir a um documentário interessante", type: "Normal"},
];

// Função para criar um item da tarefa
function createTaskItem(task, index) {
  // Criação do <li>
  const li = document.createElement('li');
  li.classList.add('task__item');
  
  // Criação do <div> que irá conter o <span> e o <p>
  const div = document.createElement('div');
  div.classList.add('task-info__container');
  
  // Criação do <span> para o tipo de tarefa
  const span = document.createElement('span');
  span.classList.add('task-type');
  
  // Adicionando a classe dinâmica ao <span> com base no tipo
  if (task.type.toLowerCase() === 'urgente') {
    span.classList.add('span-urgent');
  } else if (task.type.toLowerCase() === 'importante') {
    span.classList.add('span-important');
  } else if (task.type.toLowerCase() === 'normal') {
    span.classList.add('span-normal');
  }
  
  // Adicionando o texto ao <p>
  const p = document.createElement('p');
  p.textContent = task.title;
  
  // Adicionando o <span> e <p> à <div>
  div.appendChild(span);
  div.appendChild(p);
  
  // Criação do ícone de imagem para remover tarefa
  const img = document.createElement('img');
  img.classList.add('task__button--remove-task');
  img.src = 'assets/trash-icon.svg'; 
  img.alt = 'Remover'; 
  img.style.width = '15px'; 
  img.style.height = 'auto'; 

  
  // Adicionando um evento de clique ao ícone de remover tarefa
  img.addEventListener('click', () => {
    // Encontrar o índice da tarefa no array de tasks
    const taskIndex = tasks.findIndex(item => item.title === task.title && item.type === task.type);
    
    // Remover a tarefa do array pelo índice encontrado
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1); // Remove 1 elemento a partir do índice taskIndex
      renderElements(tasks); // Renderiza novamente a lista de tarefas atualizada
    }
  });

  // Adicionando a <div> e o <img> ao <li>
  li.appendChild(div);
  li.appendChild(img);
  
  return li;
}

// Função para renderizar as tarefas
function renderElements(tasks) {
  
  const tasksList = document.querySelector('.tasks__list');
  
  tasksList.innerHTML = '';
  
  tasks.forEach(task => {
    const taskItem = createTaskItem(task);
    tasksList.appendChild(taskItem);
  });
}

function addTask() {
  // Capturar os valores dos inputs
  const titleInput = document.getElementById('input_title');
  const typeSelect = document.querySelector('.form__input--priority');
  
  const title = titleInput.value.trim();
  const type = typeSelect.value;
  
  // Validar se os campos não estão vazios
  if (title && type) {
    const newTask = { title, type };
    
    // Adicionar a tarefa ao array
    tasks.push(newTask);
    
    renderElements(tasks);
    
    // Limpar os campos do formulário
    titleInput.value = '';
    typeSelect.value = '';
  } else {
    alert('Por favor, preencha todos os campos!');
  }
}

// Adicionar o evento de clique ao botão "Adicionar Tarefa na Lista"
const addButton = document.querySelector('.form__button--add-task');
addButton.addEventListener('click', (event) => {
  event.preventDefault();  
  addTask();  
});

// Chamando a função para renderizar as tarefas na página
renderElements(tasks);
