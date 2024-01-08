const toDoInput = document.querySelector('.todo-app__input');
const toDoList = document.querySelector('.todo-app__list');
const toDoButton = document.querySelector('.todo-app__button');
const toDoItemTemplate = document.getElementById('todo-item-template').content;

// Функция добавления задачи
const addTask = () => {
  const task = toDoInput.value;
  if (task === '') {
    alert('Поле "Введите задачу" не может быть пустым!');
  } else {
    // Клонируем template и на основе него создаем элементы списка задач
    const toDoItem = toDoItemTemplate.querySelector('.todo-app__item').cloneNode(true);
    const toDoItemText = toDoItem.querySelector('.todo-app__item-text');
    
    // Добавили текст задачи из инпута
    toDoItemText.textContent = task;

    // Добавили задачу в список
    toDoList.append(toDoItem);

    // Очищаем поле инпута после добавления задачи
    toDoInput.value = '';

    // Сохраняем содержимое списка в localStorage
    saveData();
  }
}

// Слушатель добавления задачи по кнопке "Добавить"
toDoButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  addTask();
});


// Слушатель отметки выполненной задачи и её удаления
toDoList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('todo-app__item')) {
    evt.target.classList.toggle('todo-app__item_checked');
    saveData();
  } else if (evt.target.classList.contains('todo-app__item-text')) {
    evt.target.parentElement.classList.toggle('todo-app__item_checked');
    saveData();
  }
  if (evt.target.classList.contains('todo-app__delete-button')) {
    evt.target.parentElement.remove();
    saveData();
  }
}, false);


// Функция сохранения задачи в localStorage
const saveData = () => {
  localStorage.setItem('data', toDoList.innerHTML);
}

// Функция отображения задач из localStorage при загрузки страницы
const showTasks = () => {
  toDoList.innerHTML = localStorage.getItem('data');
}

showTasks();