class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+': 
                computation = prev + current
                break
            case '-': 
                computation = prev - current
                break
            case '×': 
                computation = prev * current
                break
            case '÷': 
                computation = prev / current
                break
            default: 
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }


    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        let decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            if (decimalDigits.length > 4) {
                decimalDigits = decimalDigits.substring(0, 4);
            }
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }


    updateDisplay() {
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandText, currentOperandText)


//click and button events
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

document.addEventListener("keydown", event => {
    numberButtons.forEach(button => {
        if(event.key === button.innerText) {
            calculator.appendNumber(button.innerText);
            calculator.updateDisplay();
        }
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

document.addEventListener("keydown", event => {
    switch(event.key) {
        case "+":
            calculator.chooseOperation("+");
            calculator.updateDisplay();
            break;
        case "-":
            calculator.chooseOperation("-");
            calculator.updateDisplay();
            break;
        case "*":
            calculator.chooseOperation("×");
            calculator.updateDisplay();
            break;
        case "/":
            calculator.chooseOperation("÷");
            calculator.updateDisplay();
            break;
    }
});

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

document.addEventListener("keydown", event => {
    if(event.key === "Enter" || event.key === "=") {
        calculator.compute();
        calculator.updateDisplay();
    }
});

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

document.addEventListener("keydown", event => {
    if(event.code === "Escape") {
        calculator.clear();
        calculator.updateDisplay();
    }
});

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

document.addEventListener("keydown", event => {
    if (event.key === 'Backspace' || event.key === 'Delete') {
        calculator.delete();
        calculator.updateDisplay();
    }
});


//toggle theme
document.querySelector('.theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const outputs = document.querySelectorAll('.output');
    outputs.forEach(output => output.classList.toggle('dark'));
});
