// Declaring all variables

const OutputId = document.getElementById("output");
const errorId = document.getElementById("error");
const lastInputId = document.getElementById("lastInput");
let beforeSign = "";
let afterSign = "";
let calcCount = 0;          
let signCount = 0;
let firstNumberCount = 0;
let secondNumberCount = 0;
let totalNumberCount = 0;
let inputString = "";
let Output;
const divisionConverted = "&divide";

// Function to do the correct action when clicking a non-number button

function sideButtons(key){
    switch(key){
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
            signAssignment(key)
            break; 
    }
}

// Function to assign a value when clicking a number till it reaches the maximum count and display it

function valueAssignment(a)
{
    if(!(totalNumberCount == 11)){
        if(signCount == 0 && !(firstNumberCount == 11))
            {
        
                beforeSign += a;
                inputString += a;
                OutputId.innerHTML = inputString; 
                firstNumberCount++;
                totalNumberCount++;
            }else if(signCount == 1 && !(secondNumberCount == 11)){
                afterSign += a;
                inputString += a;
                OutputId.innerHTML = inputString;     
                secondNumberCount++;
                totalNumberCount++;
            } 
    }
}

// Function to assign a sign and display it

function signAssignment(signTemp)
{
    if(signCount == 0 && beforeSign.toString().length > 0 && !(totalNumberCount == 11))
        { 
            signCount++;
            // If the signs are the ones in Unicode, adding it to the displayed string but changing the variable to the actual operator
            if(signTemp == '\u{00D7}'){
                sign = "*";
            }else if (signTemp == '\u{00F7}'){
                sign = "/";
            }else{
                sign = signTemp;
            }

            inputString += signTemp;
            OutputId.innerHTML = inputString;
        // Throwing an 'error' if no numbers were selected before trying to add a sign
        }else if(beforeSign.length == 0)
        {
            errorId.style.fontSize = "3.4em";
            errorId.innerHTML = "Select a number first!";
            errorOverlapOutput(3000);
            allClear();

        }
}

// Function that sets the error as the first layer, call when setting an error

function errorOverlapOutput(tick)
{
    OutputId.style.color = "rgb(7, 110, 7)";
    setTimeout(() => {
        errorId.innerHTML = "";
        OutputId.style.color = "rgb(3,3,3)";
    }, tick);
}

//Function that makes all the final calculations
let outputRounded;
function Equal()
{
    // Executing the code normally if the second value is not equal to nothing, else - see line 171 -
    if(!(afterSign == "")){
        calcCount++;
        lastCalc = beforeSign;
        // Switch to check for the operator and do the correspondent math
        switch(sign){
            case '+':
                Output = (parseInt(beforeSign) + parseInt(afterSign));
                break;
            case '-':
                Output = (parseInt(beforeSign) - parseInt(afterSign));
                break;
            case '*':
                Output = (parseInt(beforeSign) * parseInt(afterSign));
                break;
            case '/':
                Output = (parseFloat(beforeSign) / parseFloat(afterSign));
                break;
        }
        
        // Rounding system for recurring decimals, rounding to five significative figures
        if(Output.toString().length > 12){
            let round; 
            round = Output.toString().split("");
            if(round[7] > 4){
                round[6]++;
            }
            outputRounded = round.splice(0, 7).join("");
            OutputId.innerHTML = outputRounded;
            beforeSign = outputRounded;
            inputString = outputRounded;
        }

        // Error when exceeding a certain size, using .length
        else if(OutputId.innerText.length - 1 > 10)
        {         
            errorId.style.fontSize = "3.8em";
            errorId.innerHTML = "Error: Exceeded";
            errorId.style.fontSize = "3.5em";
            errorOverlapOutput(1800);
            allClear();
            
        // If not, displaying the output and saving it for later
        }else{
            OutputId.innerHTML = Output;
            beforeSign = Output;
            inputString = Output;   
        }

        // Caling this function if it's not the first calculation that was made
        if(calcCount > 1 && signCount == 1){
            lastInput();
        }
        sign = "";
        signCount = 0;
        afterSign =  "";

    // if the second value is equal to nothing, throwing an error that does not clear everything
    }else if(inputString != "" && signCount == 1){
        errorId.style.fontSize = "3.4em";
        errorId.innerHTML = "Select a number first!";
        errorOverlapOutput(1800);
    }else if(inputString != "" && signCount == 0){
        errorId.style.fontSize = "3.4em";
        errorId.innerHTML = "Select a sign first!";
        errorOverlapOutput(1800);
    }
    
}

// Function that displays the last calculation that was made in the top corner

function lastInput()
{
    let lastinput = "["  + lastCalc + sign.replace("*", '\u{00D7}').replace("/", '\u{00F7}') + afterSign + "=" + Output + "]";
    if(Output.toString().length > 12){
        lastinput = "["  + lastCalc + sign.replace("*", '\u{00D7}').replace("/", '\u{00F7}') + afterSign + "=" + outputRounded + "]";
    }
    lastInputId.innerHTML = lastinput;
    sign = "";
}

// Function that sets everything to its original value

function allClear()
{
    OutputId.innerHTML ="0";
    lastInputId.innerHTML = "";
    inputString = "";
    calcCount = 0;
    signCount = 0;
    sign = "";  
    Output = 0;
    beforeSign = "";
    afterSign = "";
    firstNumberCount = 0;
    secondNumberCount = 0;
    totalNumberCount = 0;
}

const buttons = ['+', '-', '*', '/', 'Backspace', 'Enter'];

// Using a system that checks to what id the pressed key, or given value, corresponds to
['click', 'keydown'].forEach( event => {
    // Keyboard
    if(event == 'keydown'){
        document.getElementById("html").addEventListener(event, (input) => {  
            // If the key corresponds to an element, and is NaN, calling the non-numbers-button function, and giving it the key as a parameter
            if(input.key == (document.getElementById(input.key).id) && isNaN(input.key)){
                sideButtons(input.key);
            }
            
            // If the key is a number, calling the non-numbers function, and giving the key as a parameter
            else if (!(isNaN(input.key))){
                valueAssignment(input.key);
            }
        })

    // Mouse
    }else{
        for(const button of buttons){
            document.getElementById(button).addEventListener(event, () => sideButtons(button));
        }               
    } 
})

// Filtering the zero, so that it only gets counted when it makes a difference in the calculation
function zeroFilter(){
    if(beforeSign.length == 0){
    
    }else if(signCount == 1 && afterSign.length == 0){


    }else{
        valueAssignment('0');
    }
}   
