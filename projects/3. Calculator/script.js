const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');

const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const outputPreviousOperandElement = document.querySelector(
  '[data-previous-operand]'
);
const outputCurrentOperandElement = document.querySelector(
  '[data-current-operand]'
);

class Calculator {
  constructor(outputPreviousOperandElement, outputCurrentOperandElement) {
    this.outputPreviousOperandElement = outputPreviousOperandElement;
    this.outputCurrentOperandElement = outputCurrentOperandElement;
    this.computation = null;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.selectedOperation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (this.computation != null && this.selectedOperation == null) {
      this.computation = null;
      this.clear();
    }
    if (number === '.' && this.currentOperand.includes('.')) {
      return;
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') {
      return;
    }

    if (this.previousOperand !== '') {
      this.compute();
    }

    if (this.currentOperand === '.') {
      this.currentOperand = '0';
    }

    this.selectedOperation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) {
      return;
    }
    switch (this.selectedOperation) {
      case '+':
        this.computation = prev + current;
        break;
      case '-':
        this.computation = prev - current;
        break;
      case '*':
        this.computation = prev * current;
        break;
      case '÷':
        this.computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = this.computation;
    this.selectedOperation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('ru', {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.outputCurrentOperandElement.textContent = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.selectedOperation != null) {
      this.outputPreviousOperandElement.textContent = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.selectedOperation}`;
    } else {
      this.outputPreviousOperandElement.textContent = '';
    }
  }
}

const calculator = new Calculator(
  outputPreviousOperandElement,
  outputCurrentOperandElement
);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.textContent);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
