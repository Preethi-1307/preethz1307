// script.js

// Define routes for different views
const routes = {
    'form': `
        <div class="form-container">
            <h2>Sign Up</h2>
            <form id="userForm">
                <label for="name">Name</label>
                <input type="text" id="name" required>

                <label for="email">Email</label>
                <input type="email" id="email" required>

                <label for="password">Password</label>
                <input type="password" id="password" required>
                <small id="passwordHelp">Password must be 8-20 characters, include a number, an uppercase letter, and a special character.</small>

                <button type="submit">Submit</button>
            </form>

            <div id="message"></div>
        </div>`,

    'thankYou': `
        <div class="thank-you-container">
            <h1>Thank You!</h1>
            <p>Your form has been submitted successfully. Our team will contact you soon.</p>
            <button onclick="navigateTo('form')">Go Back to Form</button>
        </div>`
};

// Navigation function
function navigateTo(route) {
    const view = document.getElementById('view');
    view.innerHTML = routes[route];

    // If we're on the form page, set up form validation again
    if (route === 'form') {
        setupFormValidation();
    }
}

// Set initial route to 'form' page
navigateTo('form');

// Form validation and DOM manipulation logic
function setupFormValidation() {
    document.getElementById('userForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const password = document.getElementById('password').value;
        const passwordHelp = document.getElementById('passwordHelp');

        // Password validation regex
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/;
        
        if (!passwordRegex.test(password)) {
            passwordHelp.style.color = 'red';
            passwordHelp.textContent = 'Weak password, follow the rules!';
            return;
        } else {
            passwordHelp.style.color = 'green';
            passwordHelp.textContent = 'Strong password!';
        }

        // Hide form container immediately after submission
        document.querySelector('.form-container').style.display = 'none';

        // Move to Thank You page after a slight delay
        setTimeout(function() {
            navigateTo('thankYou');
        }, 1000); // Delay for 1 second before showing the Thank You page
    });

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Email input feedback
    emailInput.addEventListener('input', function() {
        const emailFeedback = document.createElement('div');
        emailFeedback.textContent = this.value.includes('@') ? 'Valid email!' : 'Invalid email!';
        emailFeedback.style.color = this.value.includes('@') ? 'green' : 'red';

        if (document.getElementById('emailFeedback')) {
            document.getElementById('emailFeedback').remove();
        }
        emailFeedback.setAttribute('id', 'emailFeedback');
        emailInput.parentElement.appendChild(emailFeedback);
    });

    // Password input strength feedback
    passwordInput.addEventListener('input', function() {
        const passwordStrength = document.createElement('div');
        const strength = this.value.length > 10 ? 'Strong' : 'Weak';
        passwordStrength.textContent = `Password strength: ${strength}`;
        passwordStrength.style.color = strength === 'Strong' ? 'green' : 'red';

        if (document.getElementById('passwordStrength')) {
            document.getElementById('passwordStrength').remove();
        }
        passwordStrength.setAttribute('id', 'passwordStrength');
        passwordInput.parentElement.appendChild(passwordStrength);
    });
}
