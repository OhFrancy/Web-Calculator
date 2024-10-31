// Declaring all variables and const

const outputId = document.getElementById("output");
const errorId = document.getElementById("error");
const lastInputId = document.getElementById("lastInput");
let numberCount = 0;
let toatal
let calcCount = 0;          
let signCount = 0;
let inputString = "";
let output;
let firstDigit, secondDigit;
const divisionConverted = "&divide";

// Function to assign a value when clicking a number and displaying it
function valueAssignment(a)
{
    if(numberCount == 0)
        {
            numberCount++;
            firstDigit = parseInt(a);
            inputString += a;
            outputId.innerHTML = inputString; 
        }else if(numberCount == 1 && signCount == 1)
        {
            numberCount ++;
            secondDigit = parseInt(a);
            inputString += a;
            outputId.innerHTML = inputString;    
        }   
}

// Function to assign a sign and displaying it
function signAssignment(signTemp)
{
    if(signCount < 1 && numberCount == 1)
        { 
            signCount++;
            if(signTemp == '\u{00D7}'){
                inputString += signTemp;
                sign = "*";
            }else if (signTemp == '\u{00F7}'){
                inputString += signTemp;
                sign = "/";
            }else{
                sign = signTemp;
                inputString += sign; 
            }
            outputId.innerHTML = inputString;
        }else if(signCount == 0 && numberCount == 0)
        {
            errorId.innerHTML = "Select a number first!";
            errorOverlapOutput(3000);
            allClear();
        }
}

// Function that sets the error as the first layer, call when setting an error

function errorOverlapOutput(tick)
{
    outputId.style.color = "rgb(7, 110, 7)";
    setTimeout(() => {
        errorId.innerHTML = "";
        outputId.style.color = "rgb(3,3,3)";
    }, tick);
}

//Function that makes all the final calculations

function Equal()
{
    if(!(secondDigit == undefined)){
        calcCount++;
        lastA = output;
        switch(sign){
            case '+':
                output = (firstDigit + secondDigit);
                break;
            case '-':
                output = (firstDigit - secondDigit);
                break;
            case '*':
                output = (firstDigit * secondDigit);
                break;
            case '/':
                if(firstDigit,secondDigit != 0){
                    output = (firstDigit / secondDigit);
                }else{
                    errorId.innerHTML = "Undefined";
                    errorOverlapOutput(2500);
                    allClear();
                }
                break;
        }
        
        // Error when exceeding a certain size, using .length
    
        if(inputString.length - 1 > 10){ 
            errorId.style.fontSize = "3.8em";
            errorId.innerHTML = "Error: Exceeded";
            errorId.style.fontSize = "3.5em";
            errorOverlapOutput(1800);
            allClear();

        }else{
            outputId.innerHTML = output;
            inputString = output;
            firstDigit = inputString;
        }
     
        numberCount = 1;    
        if(calcCount > 1 && signCount && numberCount){
            lastInput();
        }else{
            sign = "";  
        }
        signCount = 0;
        secondDigit = undefined;
    }else{
        errorId.style.fontSize = "2em";
        errorId.innerHTML = "Second number first!";
        errorOverlapOutput(1800);
        errorId.style.fontSize = "3.5em"
    }
    
}

// Function that displays the last calculation that was made in the top corner

function lastInput()
{
    let lastinput = "["  + lastA + sign.replace("*", '\u{00D7}').replace("/", '\u{00F7}') + secondDigit + "=" + output + "]";
    lastInputId.innerHTML = lastinput;
    sign = "";
}

// Function that sets everything to its original value

function allClear()
{
    outputId.innerHTML ="0";
    lastInputId.innerHTML = "";
    calcCount = 0;
    numberCount = 0;
    signCount = 0;
    sign = "";  
    inputString = "";
    output = 0;
    secondDigit = undefined;
}

// Algorithm to make the calculator compatible with both keys and mouseclicks on buttons.
const buttonsList = ['+', '-', '*', '/', 'Backspace', 'Enter'];
['click', 'keydown'].forEach( event => {

    // Keyboard Part
    if(event == 'keydown'){
        document.getElementById("html").addEventListener(event, (key) => {  
            if(key.key == (document.getElementById(key.key).id) && isNaN(key.key)){
                    switch(key.key){
                    case '*':
                        signAssignment('\u{00D7}')
                        break;
                    case '/':
                        signAssignment('\u{00F7}')
                        break;
                    case '=':
                        Equal();
                        break;
                    case 'Enter':
                        Equal();
                        break;
                    case 'Backspace':
                        allClear();
                        break;
                    default:
                        signAssignment(key.key)
                        break; 
                }
            }
            else if (!(isNaN(key.key))){
                valueAssignment(key.key);
            }
        })
    
    // Mouse part
    }else{
        for(let i = 0; i < 10; i++){
            let id = i;
            document.getElementById(id).addEventListener(event, () => { 
                valueAssignment(i);
            })
        }
        for(let i = 0; i < buttonsList.length; i++){
            let id = buttonsList[i];
            document.getElementById(id).addEventListener(event, () =>{
                switch(id){
                    case '*':
                        signAssignment('\u{00D7}')
                        break;
                    case '/':
                        signAssignment('\u{00F7}')
                        break;
                    case '=':
                        Equal();
                        break;
                    case 'Enter':
                        Equal();
                        break;
                    case 'Backspace':
                        allClear();
                        break;
                    default:
                        signAssignment(id)
                        break; 
                }
            })
        }
    } 
})