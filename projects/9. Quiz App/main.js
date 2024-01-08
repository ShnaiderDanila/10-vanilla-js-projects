const questions = [
  {
    question: "Какое самое большое животное в мире?",
    answers: [
      { text: 'Акула', correct: false },
      { text: 'Слон', correct: false },
      { text: 'Синий кит', correct: true }, 
      { text: 'Жираф', correct: false },
    ]
  }, 
  {
    question: "Какая страна производит больше всего кофе в мире?",
    answers: [
      { text: 'Колумбия', correct: false },
      { text: 'Индонезия', correct: false },
      { text: 'Бразилия', correct: true }, 
      { text: 'Вьетнам', correct: false },
    ]
  }, 
  {
    question: "Из какого фильма Прекрасный принц?",
    answers: [
      { text: 'Золушка', correct: true },
      { text: 'Русалочка', correct: false },
      { text: 'Спящая красавица', correct: false }, 
      { text: 'Мулан', correct: false },
    ]
  }, 
  {
    question: "Из чего сделан самый крепкий дом в “Трех поросятах”?",
    answers: [
      { text: 'Палочки', correct: false },
      { text: 'Кирпич', correct: true },
      { text: 'Солома', correct: false }, 
      { text: 'Бамбук', correct: false },
    ]
  }, 
  {
    question: "Как называется маленький пластмассовый кусочек на конце шнурка?",
    answers: [
      { text: 'Строка', correct: false },
      { text: 'Чехол', correct: false },
      { text: 'Кружево', correct: false }, 
      { text: 'Аглет', correct: true },
    ]
  }
];

const questionElement = document.getElementById('question');
const answerButtonContainer = document.querySelector('.quiz__answer-buttons');
const nextButton = document.querySelector('.quiz__next-button');
const answerButtonTemplate = document.getElementById('quiz__answer-button-template').content;

let currentQuestionIndex = 0;
let score = 0;

// Функция запуска квиза
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Далее";
  showQuestion();
}

// Функция отображения вопроса
function showQuestion() {
  resetStateQuestion();

  // Выбираем объект вопроса (по текущему индексу) из базы вопросов
  let currentQuestionObj = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestionIndex + 1 + '. ' + currentQuestionObj.question;

  // Для каждого вопроса из объекта отрисовываем из темплейта кнопку
  currentQuestionObj.answers.forEach(answer => {
    const answerButton = answerButtonTemplate.querySelector('.quiz__answer-button').cloneNode(true); 
    answerButton.textContent = answer.text;
    answerButtonContainer.append(answerButton);
    // Если свойство answer содержит correct - true, тогда добавляем кнопке пользовательский атрибут data-set (data-correct = true)
    if(answer.correct) {
      answerButton.dataset.correct = answer.correct;
    }
    // Добавляем каждой кнопке слушатель события клик с вызовом функции selectAnswer
    answerButton.addEventListener('click', selectAnswer);
  })
}

// Функция очистки контейнера с вопросом
function resetStateQuestion() {
  nextButton.style.display = "none";
  while(answerButtonContainer.firstChild) {
    answerButtonContainer.removeChild(answerButtonContainer.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  // Если у текущего элемента есть атрибут correct тогда isCorrect = true, в ином случае isCorrect = false.
  const isCorrect = selectedBtn.dataset.correct;

  // Если у кнопки isCorrect = true, тогда прибавляем к счету + 1 и добавляем соответствующий стиль
  if (isCorrect) {
    selectedBtn.classList.add('quiz__answer-button_correct');
    score++;
  } else {
    selectedBtn.classList.add('quiz__answer-button__incorrect');
  }

  // После выбранного ответа, отображаем также "правильный вариант" и блокируем дальнейший выбор вариантов ответа
  Array.from(answerButtonContainer.children).forEach(button => {
    if (button.dataset.correct) {
      button.classList.add('quiz__answer-button_correct');
    } 
    button.disabled = true;
  })
  // Отображаем кнопку далее, для перехода к следующему вопросу
  nextButton.style.display = "block";
}

// Функция отображения итогового счета
function showScore() {
  // Очищаем контейнер с вопросом
  resetStateQuestion();
  questionElement.textContent = `Количество правильных ответов ${score} из ${questions.length}`
  nextButton.textContent = "Играть снова";
  nextButton.style.display = 'block';
}

function handleNextButton() {
  currentQuestionIndex++
  if(currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if(currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
})

startQuiz();
