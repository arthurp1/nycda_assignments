function validateForm() {
    var a = document.forms["signup"]["firstname"].value;
    var b = document.forms["signup"]["lastname"].value;
    var c = document.forms["signup"]["email"].value;
    var d = document.forms["signup"]["favfood"].value;

    if (a || b || c || d !== "") {
        document.getElementById("signup").action = "/success"
    	document.getElementById("signup").method='POST'
    	return true
    }
    alert("Please fill in all your info");
    // document.getElementById("error").innerHTML ="Please fill in all your info";
    return false

}
