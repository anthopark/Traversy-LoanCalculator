const loanForm = document.querySelector('#loan-form');


function handleLoanFormSubmit(e) {
    console.log(e)

    const amount = extractValue(e, 'amount');
    const interest = extractValue(e, 'interest');
    const years = extractValue(e, 'years');

    console.log(amount, interest, years);

    const {monthlyPay, totalPay, totalInterest} = calcLoan(amount, interest, years);

    console.log(monthlyPay, totalPay, totalInterest);

    updateResults(monthlyPay, totalPay, totalInterest);

    e.preventDefault();
}

function extractValue(e, kind) {
    const inputElem = e.target.querySelector(`#${kind}`);
    console.log(inputElem);
    return inputElem.valueAsNumber
}

function calcLoan(amount, interest, years) {
    totalInterest = amount * (interest/100);
    totalPay = amount + totalInterest;
    monthlyPay = Math.round((totalPay / (years * 12 + Number.EPSILON)) * 100) / 100;
    return {
        totalInterest: totalInterest,
        totalPay: totalPay,
        monthlyPay: monthlyPay
    }
}

function updateResults(monthlyPay, totalPay, totalInterest) {
    const monPayInput = document.querySelector('#monthly-payment');
    const totPayInput = document.querySelector('#total-payment');
    const totIntInput = document.querySelector('#total-interest');

    monPayInput.value = monthlyPay;
    totPayInput.value = totalPay;
    totIntInput.value = totalInterest
}

loanForm.addEventListener('submit', handleLoanFormSubmit)