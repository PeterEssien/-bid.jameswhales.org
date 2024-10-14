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

// Show Wire Instructions or Bid Rejection
function showInstructions() {
    const instructionsDiv = document.getElementById('instructions');
    const instructionsText = document.getElementById('instructions-text');
    const referenceNumber = Math.floor(Math.random() * 1000000);

    let totalAmount = 0;
    const marketValue = 50000; // Assume $50,000 per Bitcoin

    if (bidType === 'market') {
        totalAmount = marketValue * orderSize * 100;
    } else {
        totalAmount = limitValue * orderSize * 100;
    }

    // Check if totalAmount is at least (marketValue - 10000) * orderSize * 100
    const minimumAmount = (marketValue - 10000) * orderSize * 100;

    if (totalAmount < minimumAmount) {
        // Bid rejected
        instructionsText.innerHTML = `
            Dear ${email},<br><br>
            Your bid has been rejected because the total amount of <strong>$${totalAmount.toLocaleString()}</strong> is below the minimum acceptable bid.<br><br>
            Please submit another bid.
        `;
        document.getElementById('print-button').textContent = 'Submit Another Bid';
        document.getElementById('print-button').addEventListener('click', function() {
            location.reload();
        });
    } else {
        // Bid accepted, show wire instructions
        instructionsText.innerHTML = `
            Dear ${email},<br><br>
            Please wire a total amount of <strong>$${totalAmount.toLocaleString()}</strong> to the following account:<br><br>
            <strong>Bank Name:</strong> First Pioneer Bank<br>
            <strong>Account Number:</strong> 123456789<br>
            <strong>Routing Number:</strong> 987654321<br>
            <strong>Reference Number:</strong> ${referenceNumber}<br><br>
            Thank you for your bid!
        `;
    }
    instructionsDiv.style.display = 'block';
}

// Handle Print Button / Submit Another Bid Button
document.getElementById('print-button').addEventListener('click', function() {
    if (this.textContent === '🖨️ Print') {
        window.print();
    } else {
        location.reload();
    }
});

// Handle Validate Order Button Click
document.getElementById('validate-button').addEventListener('click', function() {
    const uploadPopup = document.getElementById('upload-popup');
    uploadPopup.style.display = 'flex';
});

// Handle File Upload
document.getElementById('submit-upload').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    const uploadStatus = document.getElementById('upload-status');
    
    if (!fileInput.files.length) {
        uploadStatus.textContent = 'Please select a file to upload.';
        return;
    }

    // Simulate file upload (in a real application, you'd send the file to a server)
    uploadStatus.textContent = 'Uploading...';

    setTimeout(() => {
        uploadStatus.textContent = ''; // Clear status after the "upload"
        document.getElementById('upload-popup').style.display = 'none';
        showUploadSuccess();
    }, 2000); // Simulate a 2-second upload
});

// Show Success Message after Upload
function showUploadSuccess() {
    const popupText = document.getElementById('popup-text');
    const popup = document.getElementById('popup');

    popupText.innerHTML = `
        Your wire instruction has been uploaded successfully. You will be contacted by email within 24 hours to complete your order if the wire reflects.<br><br>
        For additional support, contact <a href="mailto:bid@johnwhales.org">bid@johnwhales.org</a>.
    `;
    popup.style.display = 'flex';
}

// Handle Closing Popups
document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

window.addEventListener('click', function(event) {
    const popup = document.getElementById('popup');
    const uploadPopup = document.getElementById('upload-popup');
    if (event.target === popup || event.target === uploadPopup) {
        popup.style.display = 'none';
        uploadPopup.style.display = 'none';
    }
});

// Tooltip functionality
const tooltipIcons = document.querySelectorAll('.tooltip-icon');
tooltipIcons.forEach(function(icon) {
    icon.addEventListener('click', function() {
        const explanation = this.getAttribute('data-tooltip');
        const popupText = document.getElementById('popup-text');
        const popup = document.getElementById('popup');
        popupText.textContent = explanation;
        popup.style.display = 'flex';
    });
});
