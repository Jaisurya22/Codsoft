document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operation = null;
    let firstOperand = null;

    function updateDisplay() {
        display.textContent = currentInput || '0';
    }

    function clearDisplay() {
        currentInput = '';
        operation = null;
        firstOperand = null;
        updateDisplay();
    }

    function appendNumber(number) {
        if (currentInput.length < 10) {
            currentInput += number;
            updateDisplay();
        }
    }

    function deleteLastChar() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    function setOperation(op) {
        if (currentInput === '') return;
        if (firstOperand !== null) {
            calculateResult();
        }
        firstOperand = parseFloat(currentInput);
        operation = op;
        currentInput = '';
    }

    function calculateResult() {
        if (operation === null || currentInput === '') return;
        let secondOperand = parseFloat(currentInput);
        let result;
        
        switch (operation) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = firstOperand / secondOperand;
                break;
        }
        
        currentInput = result.toString();
        operation = null;
        firstOperand = null;
        updateDisplay();
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            const value = button.getAttribute('data-value');
            
            if (action === 'clear') {
                clearDisplay();
            } else if (action === 'append') {
                appendNumber(value);
            } else if (action === 'delete') {
                deleteLastChar();
            } else if (action === 'set-operation') {
                setOperation(value);
            } else if (action === 'calculate') {
                calculateResult();
            }
        });
    });
});
