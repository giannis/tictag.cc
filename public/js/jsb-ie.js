$(function() {
  $('.error').hide();
  $(".button").click(function() {
		// validate and process form
		// first hide any error messages
    $('.error').hide();
		
	var name = $("input#name").val();
		if (name == "" || name == "your name..") {
			$("label#nameError").show();
			$("input#name").focus();
      		return false;
    	}
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	var email = $("input#email").val();
		if (email == "" || email == "your e-mail goes here..") {
			$("label#emailError").show();
	        $("input#email").focus();
    	    return false;
    	}
		else if (!emailReg.test(email)) {
			$("label#emailWrong").show();
	        $("input#email").focus();
    	    return false;
		}
	var message = $("textarea#message").val();
		if (message == "") {
			$("label#messageError").show();
	        $("textarea#message").focus();
      		return false;
    	}
		
	var dataString = 'name='+ name + '&email=' + email + '&message=' + message;
		
		$.ajax({
      type: "POST",
      url: "bin/process.php",
      data: dataString,
      success: function() {
        $('#contactForm').html("<div id='feedback'></div>");
        $('#feedback').html("<h2>Contact Form Submitted!</h2>")
        .append("<p>We will be in touch soon.</p>")
        .hide()
        .fadeIn(500, function() {
          $('#feedback').append("<img id='checkmark' src='images/check.png' />");
        });
      }
     });
    return false;
	});
});
runOnLoad(function(){
  $("input#name").select().focus();
});


jQuery.fn.clearFields = function(focusClass) {
	this.each(function() {
		$(this).focus(function() {
			// clear value if current value is the default
			if($(this).val() == this.defaultValue) { $(this).val(""); }
			
			// if focusClass is set, add the class
			if(focusClass) { $(this).addClass(focusClass); }
		}).blur(function() {
			// restore to the default value if current value is empty
			if($(this).val() == "") { $(this).val(this.defaultValue); }
			
			// if focusClass is set, remove class
			if(focusClass) { $(this).removeClass(focusClass); }
		});
	});
}
$(document).ready(function() {
	$("#name, #email, #message").clearFields("active");
	$("input#name").keypress(function (e){
		$("label#nameError").hide();	
	});
	$("input#email").keypress(function (e) {
		$("label#emailError").hide();						  
		$("label#emailWrong").hide();						  
	});
	$("textarea#message").keypress(function (e) {
		$("label#messageError").hide();						  
	});		
});