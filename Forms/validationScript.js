  // JavaScript code for form validation
  // Prevent form from submitting
    document.addEventListener("DOMContentLoaded", function (){
  // Retrieve the input field value
    const form = document.querySelector("#myForm");
    const input = document.querySelector("#inputField");
    let message = document.querySelector("#message");
    if (!message) {
      message = document.createElement("div");
      message.id = "message";
      form.after(message);
    }
  // Regular expression pattern for alphanumeric input
    function isAlphanumeric(value) {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(value);
    }
  // Check if the input value matches the pattern
    form.addEventListener("submit", function(event){
    event.preventDefault();
    const inputValue = input.value.trim();
    if (isAlphanumeric(inputValue)) {
  // Valid input: display confirmation and submit the form
    message.textContent = "Form submitted successfully!";
    message.style.color = "green";
    setTimeout (()=> {
      form.submit();
    }, 1500);
    } else {
      message.textContent = "Submission failed: Please enter only alphanumeric characters.";
      message.style.color = "red";
    }
  });
});