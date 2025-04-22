

// let btn = document.getElementById("btn");
// let btn_sun = document.getElementById("btn-sun")
// let display = document.getElementById("space")
// let calculator = document.getElementById("calculator")
// let buttons = document.getElementsByClassName("btn")
// let pink = document.getElementById("pink")
// let rang = document.getElementsByClassName("rang")
// let answer = "";

// btn.addEventListener("click", function () {
//     display.classList.add("night-mode")
//     calculator.classList.add("night-mode2")
//     pink.classList.add("night")
//     rang[0].classList.add("chng")

//     for (let i = 0; i < buttons.length; i++) {
//         buttons[i].classList.add("btn-change")
//     }
// })

// btn_sun.addEventListener("click", function () {
//     display.classList.remove("night-mode")
//     calculator.classList.remove("night-mode2")
//     pink.classList.remove("night")
//     rang[0].classList.remove("chng")

//     for (let i = 0; i < buttons.length; i++) {
//         buttons[i].classList.remove("btn-change")
//     }
// })


// for (let i = 0; i < buttons.length; i++) {
//     buttons[i].addEventListener("click", function (event) {
//         for (let j = 0; j < buttons.length; j++) {
//             buttons[j].classList.remove("active")
//             buttons[j].classList.add("inactive")
//         }
//         buttons[i].classList.add("active")
//         buttons[i].classList.remove("inactive")


//     })
// }

document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentNumber = '0';
    let previousNumber = '';
    let operation = null;
    let shouldResetDisplay = false;


    function updateDisplay() {
        display.textContent = currentNumber;
    }


    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;


            if (!isNaN(buttonText)) {
                if (currentNumber === '0' || shouldResetDisplay) {
                    currentNumber = buttonText;
                    shouldResetDisplay = false;
                } else {
                    currentNumber += buttonText;
                }
                updateDisplay();
            }

            else if (buttonText === '.') {
                if (!currentNumber.includes('.')) {
                    currentNumber += '.';
                    updateDisplay();
                }
            }

            else if (buttonText === 'AC') {
                currentNumber = '0';
                previousNumber = '';
                operation = null;
                updateDisplay();
            }

            else if (['+', '-', '×', '÷'].includes(buttonText)) {
                if (operation !== null) calculate();
                previousNumber = currentNumber;
                operation = buttonText;
                shouldResetDisplay = true;
            }

            else if (buttonText === '=') {
                calculate();
                operation = null;
            }

            else if (buttonText === '+/-') {
                currentNumber = (parseFloat(currentNumber) * -1).toString();
                updateDisplay();
            }

            else if (buttonText === '%') {
                currentNumber = (parseFloat(currentNumber) / 100).toString();
                updateDisplay();
            }
        });
    });


    function calculate() {
        let result;
        const prev = parseFloat(previousNumber);
        const current = parseFloat(currentNumber);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            default:
                return;
        }

        currentNumber = result.toString();
        previousNumber = '';
        shouldResetDisplay = true;
        updateDisplay();
    }


    updateDisplay();
});