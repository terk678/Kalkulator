document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const buttons = Array.from(document.getElementsByClassName("btn"));
    const themeButton = document.getElementById("theme-button");
    let currentInput = "0";
    let operator = null;
    let previousInput = null;

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const value = this.getAttribute("data-value");

            if (value === "C") {
                currentInput = "0";
                operator = null;
                previousInput = null;
            } else if (value === "=") {
                if (operator && previousInput !== null) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    operator = null;
                    previousInput = null;
                }
            } else if (["+", "-", "*", "/"].includes(value)) {
                if (operator && previousInput !== null) {
                    currentInput = calculate(previousInput, currentInput, operator);
                }
                operator = value;
                previousInput = currentInput;
                currentInput = "";
            } else {
                if (currentInput === "0" && value !== ".") {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
            }
            updateDisplay();
        });
    });

    themeButton.addEventListener("click", function() {
        document.body.classList.toggle("dark");
    });

    function updateDisplay() {
        display.textContent = currentInput || "0";
    }

    function calculate(a, b, operator) {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);

        switch (operator) {
            case "+":
                return (num1 + num2).toString();
            case "-":
                return (num1 - num2).toString();
            case "*":
                return (num1 * num2).toString();
            case "/":
                return (num1 / num2).toString();
            default:
                return b;
        }
    }

    updateDisplay();
});
