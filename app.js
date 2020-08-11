const loanForm = document.querySelector('#loan-form');
loanForm.addEventListener('submit', handleLoanFormSubmit);


function handleLoanFormSubmit(e) {

    // hide results
    document.querySelector('#results').style.display = 'none';

    console.log(e)

    const amount = extractValue(e, 'amount');
    const interest = extractValue(e, 'interest');
    const years = extractValue(e, 'years');


    console.log(amount, interest, years);

    if (!isValidFormInput(amount, interest, years)) {
        showError('Please check your numbers');
    } else {


        // show loader
        document.querySelector('#loading').style.display = 'block';

        const { monthlyPay, totalPay, totalInterest } = calcLoan(amount, interest, years);

        console.log(monthlyPay, totalPay, totalInterest);

        setTimeout(updateResults, 2000, monthlyPay, totalPay, totalInterest);


    }

    e.preventDefault();
}

function extractValue(e, kind) {
    const inputElem = e.target.querySelector(`#${kind}`);
    console.log(inputElem);
    return parseFloat(inputElem.value);
}

function isValidFormInput(amount, interest, years) {
    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
        return false;
    } else {
        return true;
    }
}

function showError(errorMessage) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(errorMessage));

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // adding errorDiv inside the card but before heading.
    card.insertBefore(errorDiv, heading);

    // clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}

function calcLoan(amount, interest, years) {
    totalInterest = amount * (interest / 100);
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

    document.querySelector('#loading').style.display = 'none';
    document.querySelector('#results').style.display = 'block';
}

