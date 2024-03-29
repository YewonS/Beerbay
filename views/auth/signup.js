console.log(window.location.href)

if(window.location.href.includes("error")){
    alert("Username or Email already exist");
}

function validateUser() {

    const username = document.forms.signupform.username.value;
    const email = document.forms.signupform.email.value;
    const password = document.forms.signupform.password.value;
    const passwordRepeat = document.forms.signupform.passwordRepeat.value;

    if (!username) {
        alert("Username field is missing.");
        return false;
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
        alert("Email is not valid.");
        return false;
    }

    if (password.length < 8) {
        alert("Password should be more than 8 characters.");
        return false;
    }

    if (password !== passwordRepeat) {
        alert("Passwords don't match.");
        return false;
    }

}
