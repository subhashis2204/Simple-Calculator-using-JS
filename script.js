const history = document.querySelector('.history');
const result = document.querySelector('.result');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');

function getHistory() {
    return history.innerText;
}
function printHistory(num) {
    history.innerText = num;
}
function getOutput() {
    return result.innerText;
}
function printOutput(num) {
    if (num == "")
        result.innerText = '';
    else
        result.innerText = num;
}
function formattedString(num) {
    if (Number.isInteger(num))
        return parseInt(num).toLocaleString();
    else
        return num.toLocaleString();

}
function reverseFormattedString(num) {
    return Number(num.replace(/,/g, ''));
}

function clearOutput() {
    printOutput('');
}

for (let operator of operators) {
    operator.addEventListener('click', (e) => {
        switch (e.target.id) {
            case 'C':
                printOutput('');
                printHistory('');
                break;
            case 'CE':
                let n = reverseFormattedString(getOutput());  // we are sure the returned value if not an integer then NaN
                //  we can use the isNaN(value1, value2) or Object.is(value1, value2) to check for NaN or 
                //  undefined types the second option is much better
                if (isNaN(n)) {
                    let s = getHistory();
                    // console.log(s.slice(0, s.length - 1));
                }
                else {
                    let s = n.toString();
                    if (s.length == 1)
                        clearOutput();
                    else
                        printOutput(formattedString(s.slice(0, s.length - 1)));
                }

                break;
            case '%':
                printHistory(`${getOutput()}%`);
                clearOutput();
                break;
            case '/':
                printHistory(`${getOutput()}/`);
                clearOutput();
                break;
            case 'x':
                printHistory(`${getOutput()}*`);
                clearOutput();
                break;
            case '-':
                printHistory(`${getOutput()}-`);
                clearOutput();
                break;
            case '+':
                printHistory(`${getOutput()}+`);
                clearOutput();
                break;
            case '=':
                let a = getHistory();
                let num1 = reverseFormattedString(a.slice(0, a.length - 1));
                let num2 = reverseFormattedString(getOutput());
                let op = a[a.length - 1];
                // console.log(num1, num2);
                // console.log(getHistory().slice(0, this.length));
                let result;
                if (op === '/') {
                    result = num1.toFixed(2) / num2.toFixed(2);
                }
                else
                    result = eval(`${num1}${op}${num2}`);

                printHistory('');
                printOutput(formattedString(result));
                break;

        }
    })
}


for (let number of numbers) {
    number.addEventListener('click', (e) => {
        // let number = reverseFormattedString(getOutput());
        // if (!isNaN(number)) {
        //     number = number + e.target.id;
        //     printOutput(number);
        // }
        if (getOutput() == '') {
            // directly add the id
            printOutput(e.target.id)
        }
        else {
            //process the number in the output
            let value = reverseFormattedString(getOutput());
            value = value + e.target.id;
            printOutput(formattedString(value))
        }

    })
}
