document.addEventListener("DOMContentLoaded", ()=> {
    document.getElementById("emailForm").addEventListener("submit", function(e) {
        e.preventDefault(); //Prevent form submit
    
        //get data
        let fullName = document.getElementById("fullName").value
        let email = document.getElementById("email").value
        let phone = document.getElementById("phone").value
        let streetAddress = document.getElementById("streetAddress").value
        let city = document.getElementById("city").value

        console.log(fullName," ", email)
        //create XMLHttpRequest object
        const xhr = new XMLHttpRequest();
    
        //Configure the request
        xhr.open("POST", "/send-email", true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        //Set up the callback
        xhr.onload = function() {
            if (xhr.status === 200) {
                document.getElementById("response").textContent = "Email sent successfully!"
            } else {
                document.getElementById("response").textContent = "Failed to send email. Please try again later."
            }
        };
    
        //Send the request
        xhr.send(JSON.stringify({
            fullName: fullName,
            Email: email,
            Phone: phone,
            Address: streetAddress,
            City: city
        }))
    });
})