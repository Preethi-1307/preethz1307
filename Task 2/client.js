document.getElementById("studentForm").addEventListener("submit", function(event) {
    const email = document.getElementById("email").value;
    const semester = document.getElementById("semester").value;
    const duration = document.getElementById("duration").value;
    let isValid = true;

    // Email validation
    if (!email.includes("@")) {
        document.getElementById("emailError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("emailError").style.display = "none";
    }

    // Semester validation
    if (semester < 1 || semester > 6) {
        document.getElementById("semesterError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("semesterError").style.display = "none";
    }

    // Duration validation
    if (duration < 1 || duration > 6) {
        document.getElementById("durationError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("durationError").style.display = "none";
    }

    // Prevent form submission if validation fails
    if (!isValid) {
        event.preventDefault();
    }
});