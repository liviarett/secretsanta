$(document).ready(function (){
	/* $('#santaList').append("<p class='listItem' value='" + "Livia" +"'>" + "Livia" + " - " + "rett" + "<button class='deleteSanta'>&#10006</button></p>")
	 */
	// CLICK FUNCTIONS
	$("#santaBtn").click(function(){
		addSanta();
	});
	
	$("#santaEmail").keypress(function (e) {
  if (e.which == 13) {
	  addSanta();
	  $("#santaName").focus();
  }
});
	$("#santaName").keypress(function (e) {
  if (e.which == 13) {
	  addSanta();
  }
});
	$('#render').click(function() {
		if (secretSantas.length == 0 || secretSantas.length == 1) {
			return;
		}
		renderSantas();
		console.log(secretSantas);
		$('#santaList').empty();		
		for (santaIndex = 0; santaIndex < secretSantas.length; santaIndex++) {
		var $match = secretSantas[santaIndex].match
		sendEmail(secretSantas[santaIndex].email, $match);
		} 
		allDone();
	});
	$('i.fa-refresh').click(function(){
		startOver();
	});
	
	// Delete Santa from list
	$(document).on('click', '.deleteSanta', function() {
		var $name = $(this).parent().attr("value");
		console.log($name);
		for (var i = 0; i < secretSantas.length; i++) {
    if (secretSantas[i].name === $name) {
      secretSantas.splice(i, 1);
    }
  }
		$(this).parent().remove();
		console.log(secretSantas);
	});
	$(document).on('click', 'i.fa-times', function() {
		$('.lightbox').hide();
		startOver();
	});
	$(document).on('click', '#sendAllMatches', function() {
		var $email = $("#adminSantaEmail").val();
		if (!validateEmail($email)) {
			return;
		};
		$("#adminSantaEmail").empty();
		sendAllSantas($email);
		$('.lightbox div button').remove();
		$('.lightbox div').append('<button id="sendAllMatches">E-mail Sent <i class="fa fa-check" aria-hidden="true"></i></button>');
		$('#sendAllMatches').css('cursor', 'auto')
			
			//.html('E-mail Sent <i class="fa fa-check" aria-hidden="true"></i>');
	});
	
	// SANTAS
	var secretSantas = [];
	
	function addSanta() {
		var $name = $("#santaName").val().toLowerCase();
		var $email = $("#santaEmail").val().toLowerCase();
		$('.errorContainer').empty();
		if ($name == "") {
			$('#errorContainer1').html('Please enter a valid name!');
			return;
		}
		for (santaIndex = 0; santaIndex < secretSantas.length; santaIndex++) {
			if ($name == secretSantas[santaIndex].name) {
				$('#errorContainer1').html('Name already on the list!');
				$("#santaName").focus();
				return;
			}
		}		
		if ($email == "") {
			$("#santaEmail").focus();
			$('#errorContainer2').html('Please enter an e-mail address!');
			return;
		} else if (!validateEmail($email)) {
			$("#santaEmail").focus();
			$('#errorContainer2').html('Please enter a valid e-mail address!');
			return;   
		}

		secretSantas.push({
			name: $name,
			email: $email
		});
		
		$('#santaList').append("<p class='listItem' value='" + $name +"'>" + toProperCase($name) + " - " + $email + "<button class='deleteSanta'>&#10006</button></p>")
		$("#santaName").val("");
		$("#santaEmail").val("");
		
	}
	
	function toProperCase(string) {
		string = string.toLowerCase().replace(/\b[a-z]/g, function(txtVal) {
      return txtVal.toUpperCase();
   });
   return string;
};

	function renderSantas() {
		console.log("Rendering Santas....");
		var secretMatches = [];
		
		// Creating Matches
		for (santaIndex = 0; santaIndex < secretSantas.length; santaIndex++) {
			secretMatches.push(secretSantas[santaIndex]);
		};
		
		// Assigning matches
		for (santaIndex = 0; santaIndex < secretSantas.length; santaIndex++) {
			var i = Math.floor(Math.random() * (secretMatches.length));
				secretSantas[santaIndex]["match"] = secretMatches[i].name;
				secretMatches.splice(i, 1);
		}
		checkMatches();
	};
		// If name = match
	function checkMatches() {
			$.each(secretSantas, function() {
			if(this.name == this.match) {
				console.log(this.name + " got " + this.match);
					renderSantas();
			}
		})
		};
	
	function startOver() {
		secretSantas = [];
		$('#santaList').empty();
		$('.errorContainer').empty();
	};
	
	function sendEmail($email, $match) {
		Email.send("ss.secretsanta.app@gmail.com",
$email,
"Your Secret Santa!",
'<!doctype html><html class="no-js" lang="" style="padding: 0; margin: 0; background-color: rgb(36, 53, 83); background-image: url(http://liviarett.com/secretsanta/images/winterbackground.jpg); background-size: 100%; background-repeat: no-repeat; text-align: center; font-family: Helvetica;"><head><meta charset="UTF-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>Secret Santa</title><meta name="viewport" content="width=device-width, initial-scale=1"><style>;@media (max-width: 600px) {h1 {font-size: 50px;padding: 10px;margin-bottom: 100px;} html{background-size: 200%;}}</style></head><body style="padding: 0; margin: 0;"><h1 style="margin: 0; font-size: 80px; font-weight: 400; padding: 70px; font-family: "Helvetica", sans-serif; color: #7a1414;">Your Secret Santa match is...</h1><p style="font-size: 30px; color: rgb(220, 220, 220); display: block; width: 100%; padding: 20px 0; margin: 0; background-color: #7a1414;">' + toProperCase($match) + '!</p></body></html>',
{token: "75c9d417-7cf1-4376-be10-2b1348b0a066"});
	};

	function validateEmail($email) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		return emailReg.test( $email );
};
	
	function allDone() {
		$('body').append('<div class="lightbox"><div><i class="fa fa-times" aria-hidden="true"></i><h1>All done!</h1><p>An e-mail has been sent to each Santa with their match.</p><br><p>If you would like to receive an e-mail with all the matches for the record, add the e-mail address below and click the button.</p><br><input id="adminSantaEmail" type="email" placeholder="E-mail address" /><button id="sendAllMatches">Send all matches!</button></div></div>')
	};
	
	function sendAllSantas($email) {
		var santaMatches = '';
		for (santaIndex = 0; santaIndex < secretSantas.length; santaIndex++) {
			santaMatches += '<p style="font-size: 30px; color: rgb(220, 220, 220); display: block; width: 100%; padding: 20px 0; margin: 0; background-color: #7a1414;">' + toProperCase(secretSantas[santaIndex].name) + ' got ' + toProperCase(secretSantas[santaIndex].match) + '</p>';
		};
		Email.send("ss.secretsanta.app@gmail.com",
$email,
"The full list of Santas!",
'<!doctype html><html class="no-js" lang="" style="padding: 0; margin: 0; background-color: rgb(36, 53, 83); background-image:url(http://liviarett.com/secretsanta/images/winterbackground.jpg); background-size: 100%; background-repeat: no-repeat; text-align: center; font-family: Helvetica;"><head><meta charset="UTF-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>Secret Santa</title><meta name="viewport" content="width=device-width, initial-scale=1"><style>;@media (max-width: 600px) {h1 {font-size: 50px;padding: 10px;margin-bottom: 100px;} html{background-size: 200%;}}</style></head><body style="padding: 0; margin: 0;"><h1 style="margin: 0; font-size: 80px; font-weight: 400; padding: 70px; font-family: Helvetica, sans-serif; color: #7a1414;">The Santas are...</h1>' + santaMatches.toString() + '</body></html>',
{token: "75c9d417-7cf1-4376-be10-2b1348b0a066"});
	};
});