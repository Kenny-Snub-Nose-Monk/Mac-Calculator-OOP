class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = "0"
    this.previousOperand = ""
    this.operation = undefined
    this.updatefrontSize()
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)

    if (this.currentOperand === "") this.currentOperand = "0"
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return
    if (this.previousOperand !== "") {
      this.compute()
    }

    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = "0"
  }

  percentage() {
    this.currentOperand = parseFloat(this.currentOperand) * 0.01
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case "+":
        computation = prev + current
        break
      case "-":
        computation = prev - current
        break
      case "×":
        computation = prev * current
        break
      case "÷":
        computation = prev / current
        break
      default:
        return
    }

    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ""
  }

  changeSign() {
    if (this.currentOperand === "0") return

    this.currentOperand = this.currentOperand.includes("-")
      ? this.currentOperand.slice(1)
      : "-" + this.currentOperand
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split(".")[0])
    const decimalDigits = stringNumber.split(".")[1]
    let integerDisplay

    if (isNaN(integerDigits)) {
      integerDisplay = ""
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      })
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.textContent = this.getDisplayNumber(
      this.currentOperand
    )
    if (this.operation != null) {
      this.previousOperandTextElement.textContent = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`
    } else {
      this.previousOperandTextElement.textContent = ""
    }

    this.updatefrontSize()
  }

  updatefrontSize() {
    const currentOperandfrontSize = parseFloat(
      window
        .getComputedStyle(currentOperandTextElement, null)
        .getPropertyValue("font-size")
    )
    const previousOperandfrontSize = parseFloat(
      window
        .getComputedStyle(previousOperandTextElement, null)
        .getPropertyValue("font-size")
    )

    if (this.currentOperandTextElement.clientWidth <= 217) {
      currentOperandTextElement.style.fontSize = "48px"
    } else if (this.previousOperandTextElement.clientWidth <= 217) {
      previousOperandTextElement.style.fontSize = "1rem"
    }

    while (
      this.currentOperandTextElement.clientWidth > 217 ||
      this.previousOperandTextElement.clientWidth > 217
    ) {
      if (this.currentOperandTextElement.clientWidth > 217) {
        currentOperandTextElement.style.fontSize =
          currentOperandfrontSize * 0.88 + "px"
      } else if (this.previousOperandTextElement.clientWidth > 217) {
        previousOperandTextElement.style.fontSize =
          previousOperandfrontSize * 0.88 + "px"
      }
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const signchangeButton = document.querySelector("[data-sign-change]")
const percentageButton = document.querySelector("[data-percentage]")
const equalButton = document.querySelector("[data-equals]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
)
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
)

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
)

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()

    console.log(currentOperandTextElement.clientWidth)
  })
})

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

signchangeButton.addEventListener("click", button => {
  calculator.changeSign()
  calculator.updateDisplay()
})

percentageButton.addEventListener("click", button => {
  calculator.percentage()
  calculator.updateDisplay()
})

equalButton.addEventListener("click", button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener("click", button => {
  calculator.clear()
  calculator.updateDisplay()
})

allClearButton.addEventListener("click", button => {
  calculator.clear()
  calculator.updateDisplay()
})

document.addEventListener("keydown", e => {
  if (e.key === "Delete" || e.key === "Backspace") {
    calculator.delete()
    calculator.updateDisplay()
  }
})
