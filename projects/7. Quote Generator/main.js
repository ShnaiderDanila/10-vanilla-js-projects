// Практика работы с JSONP (для старых браузеров)

const quote = document.querySelector(".quote-generator__quote");
const author = document.querySelector(".quote-generator__author");
const generateButton = document.querySelector(".quote-generator__button");

const apiUrl =
  "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=parseQuote";

function createJSONP(url) {
  const script = document.createElement("script");
  script.src = url;
  script.classList.add("jsonp-script");
  document.body.appendChild(script);
}

function loadJSONP(url) {
  const jsonpScript = document.querySelector(".jsonp-script");
  if (jsonpScript) {
    jsonpScript.remove();
    createJSONP(url);
  } else {
    createJSONP(url);
  }
}

function parseQuote(response) {
  quote.textContent = `"${response.quoteText}"`;
  if (response.quoteAuthor === "") {
    author.textContent = "Неизвестный автор";
  } else {
    author.textContent = response.quoteAuthor;
  }
}

generateButton.addEventListener("click", () => {
  generateButton.disabled = true;
  generateButton.textContent = "Загрузка...";
  loadJSONP(apiUrl);
  setTimeout(() => {
    generateButton.textContent = "Новая цитата";
    generateButton.disabled = false;
  }, 2000);
});

generateButton.click();
