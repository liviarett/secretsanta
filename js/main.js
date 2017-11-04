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
	$('#render').click(function() {
		if (secretSantas.length == 0 || secretSantas.length == 1) {
			return;
		}
		renderSantas();
		console.log(secretSantas);
		$('#santaList').empty();		
		for (santaIndex = 0; santaIndex < secretSantas.length; santaIndex++) {
		var $name = secretSantas[santaIndex].name
		var $match = secretSantas[santaIndex].match
		$('#santaList').append("<p class='listItem'>" + toProperCase($name) + "'s match is " + toProperCase($match) + "</p>")
		}
	});
	$('i.fa-refresh').click(function(){
		startOver();
	})
	// Delete Santa from listx1
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
	// SANTAS
	var secretSantas = [];
	
	function addSanta() {
		var $name = $("#santaName").val().toLowerCase();
		var $email = $("#santaEmail").val().toLowerCase();
		$('.errorContainer').empty();
		if ($name == "") {
			$('.errorContainer').html('Please enter a valid name!');
			return;
		}
		for (santaIndex = 0; santaIndex < secretSantas.length; santaIndex++) {
			if ($name == secretSantas[santaIndex].name) {
				$('.errorContainer').html('Name already on the list!');
				return;
			}
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
	
	// parameters: service_id, template_id, template_parameters
// emailjs.send("default_service","<YOUR TEMPLATE ID>",{name: "James", notes: "Check this out!"});
});