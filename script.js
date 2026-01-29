// add
function add(a, b) {
  return a + b;
}
// subtract
function subtract(a, b) {
  return a - b;
}
// multiply
function multiply(a, b) {
  return a * b;
}
// divide
function divide(a, b) {
  return +(a / b).toFixed(2);
}

const DIVIDE_BY_0_MSG = "SNEAKY SNEAKY";
// operate function takes an operator and two numbers and calls the correct operation
function operate(a, b, operator) {
  a = Number(a);
  b = Number(b);
  let res;
  switch (operator) {
    case "+":
      res = add(a, b);
      break;
    case "-":
      res = subtract(a, b);
      break;
    case "*":
      res = multiply(a, b);
      break;
    case "/":
      if (b === 0) {
        return DIVIDE_BY_0_MSG;
      }
      res = divide(a, b);
      break;
    default:
      res = a;
      break;
  }
  return String(+res.toFixed(5))
}

// variables for first number, second number and operator
let firstNumber = "";
let secondNumber = "";
let operator = "";

// any operator pressed afterwards should change the operator
// boolean flag for when operator is selected, so user updates the second number
let operatorPressed = false;

// get display
const display = document.querySelector("#display");

function updateText() {
  display.textContent = `${firstNumber} ${operator} ${secondNumber}`.trim();
}

// Create the functions that update one of your number variables when the calculator’s digit buttons are clicked.
// Your calculator’s display should also update to reflect the value of that number variable.
const numberButtons = document.querySelectorAll("button.number");
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // first number should be before operator is pressed
    // if operator is pressed
    // first number should not be updated, any number pressed should update second number
    !operatorPressed
      ? (firstNumber += button.textContent)
      : (secondNumber += button.textContent);

    // update text
    updateText();
  });
});

const operatorButtons = document.querySelectorAll("button.operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!firstNumber) firstNumber = 0;
    if (!operatorPressed) {
      operatorPressed = true;
    } else {
      if (secondNumber) {
        firstNumber = operate(firstNumber, secondNumber, operator);
        secondNumber = "";
      }
    }
    operator = button.textContent;
    isFloat = false;
    updateText();
  });
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  display.textContent = "Cleared!";
});

// equal button should call operate function and display the result
const equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", () => {
  if (firstNumber === '' || secondNumber === '' || operator === '') return;

  const res = operate(firstNumber, secondNumber, operator);
  firstNumber = "";
  secondNumber = "";
  operator = "";
  operatorPressed = false;
  display.textContent = res;
});

// Your calculator should not evaluate more than a single pair of numbers at a time.
// 12 + 7 entered
// if user enters another operator example '-'
// evaluate the first pair of numbers

// if user divides by 0, error message should be display, data should be cleared

// When a result is displayed, pressing a new digit should clear the result and start a new calculation
// instead of appending the digit to the existing result. Check whether this is the case on your calculator!

// Pressing = before entering all of the numbers or an operator could cause problems!

let isFloat = false;
const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", () => {
  if (!isFloat) {
    // first number
    !operatorPressed
      ? firstNumber
        ? (firstNumber += ".")
        : (firstNumber = "0.")
      : secondNumber
        ? (secondNumber += ".")
        : (secondNumber = "0.");
    isFloat = true;
    updateText();
  }
});
