let inputDate = document.querySelector('.age-calculator__input');
const calculateBtn = document.querySelector('.age-calculator__button');
const result = document.querySelector('.age-calculator__result');

const spanYear = document.querySelector('.age-calculator__span-year');
const spanMonth = document.querySelector('.age-calculator__span-month');
const spanDay = document.querySelector('.age-calculator__span-day');

inputDate.max = new Date().toISOString().split('T')[0];

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
}

function getYearString(year) {
  let count = year % 100;

  if (count >= 10 && count <= 20) {
    return 'лет'
  } else {
    count = year % 10
    if (count === 1) {
      return 'год'
    } else if (count >= 2 && count <= 4) {
      return 'года'
    } else {
      return 'лет'
    }
  }
}


function getMonthString(month) {
  let count = month % 100;

  if (count >= 10 && count <= 20) {
    return 'месяцев'
  } else {
    count = month % 10
    if (count === 1) {
      return 'месяц'
    } else if (count >= 2 && count <= 4) {
      return 'месяца'
    } else {
      return 'месяцев'
    }
  }
}


function getDayString(day) {
  let count = day % 100;

  if (count >= 10 && count <= 20) {
    return 'дней'
  } else {
    count = day % 10
    if (count === 1) {
      return 'день'
    } else if (count >= 2 && count <= 4) {
      return 'дня'
    } else {
      return 'дней'
    }
  }
}

const calculateAge = () => {

  let birthDate = new Date(inputDate.value);

  let inputDay = birthDate.getDate();
  let inputMonth = birthDate.getMonth() + 1;
  let inputYear = birthDate.getFullYear();

  let today = new Date();

  let todayDay = today.getDate();
  let todayMonth = today.getMonth() + 1;
  let todayYear = today.getFullYear();

  let resultDay, resultMonth, resultYear;

  resultYear = todayYear - inputYear;

  if (todayMonth >= inputMonth) {
    resultMonth = todayMonth - inputMonth;
  } else {
    resultYear--;
    resultMonth = (12 + todayMonth) - inputMonth;
  }

  if (todayDay >= inputDay) {
    resultDay = todayDay - inputDay;
  } else {
    resultMonth--;
    resultDay = (getDaysInMonth(inputYear, inputMonth) + todayDay) - inputDay;
  }

  if (resultMonth < 0) {
    resultMonth = 11;
    resultYear--;
  }

  spanYear.textContent = `${resultYear} ${getYearString(resultYear)}`;
  spanMonth.textContent = `${resultMonth} ${getMonthString(resultMonth)}`;
  spanDay.textContent = `${resultDay} ${getDayString(resultDay)}`;

  result.style.opacity = 1;

}

calculateBtn.addEventListener('click', calculateAge);
