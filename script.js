function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return +(a / b).toFixed(2);
}

const DIVIDE_BY_0_MSG = "SNEAKY SNEAKY";
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
  return String(+res.toFixed(5));
}

let firstNumber = "";
let secondNumber = "";
let operator = "";
let operatorPressed = false;
let isFloat = false;

const display = document.querySelector("#display");
function updateText() {
  display.textContent = `${firstNumber} ${operator} ${secondNumber}`.trim();
}

const numberButtons = document.querySelectorAll("button.number");
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    !operatorPressed
      ? (firstNumber += button.textContent)
      : (secondNumber += button.textContent);

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
  reset();
});

const equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", () => {
  if (firstNumber === "" || secondNumber === "" || operator === "") return;

  const res = operate(firstNumber, secondNumber, operator);
  reset();
  display.textContent = res;
});

const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", () => {
  if (!isFloat) {
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

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", () => {
  if (secondNumber) {
    const lastChar = secondNumber.at(-1);
    lastChar === "." ? (isFloat = false) : (isFloat = true);
    secondNumber = secondNumber.slice(0, -1);
  } else if (operator) {
    operator = "";
    firstNumber.includes(".") ? (isFloat = true) : (isFloat = false);
  } else if (firstNumber) {
    const lastChar = firstNumber.at(-1);
    lastChar === "." ? (isFloat = false) : (isFloat = true);
    firstNumber = firstNumber.slice(0, -1);
  }
  updateText();
});

function reset() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  operatorPressed = false;
  isFloat = false;
  display.textContent = '0'
}
