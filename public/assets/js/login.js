$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var useremailInput = $("input#email");
  var passwordInput = $("input#password");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    console.log("hello");
    event.preventDefault();
    var userData = {
      email: useremailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email) {
      useremailInput.css("border", "solid 1px red");
      $("#useremail-feedback").text("Please enter a username");
      return;
    }

    if (!userData.password) {
      passwordInput.css("border", "solid 1px red");
      $("#password-feedback").text("Please enter a password");
      return;
    }


    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    useremailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(useremail, password) {
    $.post("/users/login", {
      email: useremail,
      password: password
    }).then(function(data) {
      console.log("hello2"
      );
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      $("#password-feedback").text("Incorrect Username or Password");
    });
  }

});
