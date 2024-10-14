// Variables to store user input
let bidType = 'market';
let limitValue = 0;
let orderSize = 0;
let email = '';
let captchaResult = 0;

// Handle bid type change
document.getElementById('bid-type').addEventListener('change', function() {
    bidType = this.value;
    const limitContainer = document.getElementById('limit-value-container');
    if (bidType === 'limit') {
        limitContainer.style.display = 'block';
    } else {
        limitContainer.style.display = 'none';
    }
});

// Handle Place Bid button
document.getElementById('place-bid').addEventListener('click', function() {
    orderSize = parseInt(document.getElementById('order-size').value) || 0;
    if (bidType === 'limit') {
        limitValue = parseFloat(document.getElementById('limit-value').value) || 0;
        if (limitValue <= 0) {
            alert('Please enter a valid limit order value.');
            return;
        }
    }
    if (orderSize <= 0) {
        alert('Please enter a valid order size.');
        return;
    }
    document.getElementById('bid-form').style.display = 'none';
    document.getElementById('email-form').style.display = 'block';
});

// Handle Email Submit button
document.getElementById('submit-email').addEventListener('click', function() {
    email = document.getElementById('email').value;
    if (!email) {
        alert('Please enter your email.');
        return;
    }
    document.getElementById('email-form').style.display = 'none';
    generateCaptcha();
    document.getElementById('captcha-form').style.display = 'block';
});

// Generate simple arithmetic captcha
function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    captchaResult = num1 + num2;
    document.getElementById('captcha-question').textContent = `What is ${num1} + ${num2}?`;
}

// Handle Captcha Verification
document.getElementById('submit-captcha').addEventListener('click', function() {
    const answer = parseInt(document.getElementById('captcha-answer').value) || 0;
    if (answer !== captchaResult) {
        alert('Incorrect answer. Please try again.');
        generateCaptcha();
        document.getElementById('captcha-answer').value = '';
        return;
    }
    document.getElementById('captcha-form').style.display = 'none';
    showInstructions();
});

// Show Wire Instructions
function showInstructions() {
    const instructionsDiv = document.getElementById('instructions');
    const instructionsText = document.getElementById('instructions-text');
    const referenceNumber = Math.floor(Math.random() * 1000000);

    let totalAmount = 0;
    if (bidType === 'market') {
        // Simulate market value
        const marketValue = 50000; // Assume $50,000 per Bitcoin
        totalAmount = marketValue * orderSize * 100;
    } else {
        totalAmount = limitValue * orderSize * 100;
    }

    instructionsText.innerHTML = `
        Dear ${email},<br><br>
        Please wire a total amount of <strong>$${totalAmount.toLocaleString()}</strong> to the following account:<br><br>
        <strong>Bank Name:</strong> First Pioneer Bank<br>
        <strong>Account Number:</strong> 123456789<br>
        <strong>Routing Number:</strong> 987654321<br>
        <strong>Reference Number:</strong> ${referenceNumber}<br><br>
        Thank you for your bid!
    `;
    instructionsDiv.style.display = 'block';
}

// Handle Print Button
document.getElementById('print-button').addEventListener('click', function() {
    window.print();
});
