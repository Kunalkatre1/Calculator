const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){
    // Replace current display value if first value is entered.
    if(awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    }
    else{
        //If current display value is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number ;  
    }
}

// Clear button / Reset Display
function clear(){
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Add Decimal
function addDecimal(){
    // If operator is pressed do not add decimal
    if(awaitingNextValue) return;
    
    // If no decimal add one decimal point
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Calculate 1st & 2nd values depending on selected operator
 const calculate = {
    '/' : (firstNumber, secondNumber) => firstNumber / secondNumber,

    '+' : (firstNumber, secondNumber) => firstNumber + secondNumber,

    '*' : (firstNumber, secondNumber) => firstNumber * secondNumber,

    '-' : (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=' : (firstNumber, secondNumber) => secondNumber,

 };

// Operator function
function useOperator(operator){

    // To prevent multiple operator
    if(operatorValue && awaitingNextValue){
        operatorValue = operator;
        return;
    } 

    const currentValue = Number(calculatorDisplay.textContent);
    // Assign first value if first value does not exsist.
    if(!firstValue){
        firstValue = currentValue;
    }else{
        const calculation = calculate[operatorValue](firstValue, currentValue); 
        firstValue = calculation;
    }

    // Ready for next value
    awaitingNextValue = true;
    operatorValue = operator;
}

// Add Eventlisteners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    }
    else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    }
    else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

clearBtn.addEventListener('click', clear);