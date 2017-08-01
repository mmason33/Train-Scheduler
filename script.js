  var config = {
    apiKey: "AIzaSyDjikRfJ5KOUaz1T-EOPB41suVXBwoKVIc",
    authDomain: "uci-project-964c8.firebaseapp.com",
    databaseURL: "https://uci-project-964c8.firebaseio.com",
    projectId: "uci-project-964c8",
    storageBucket: "",
    messagingSenderId: "137641996951"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

$(".btn-primary").on("click", function() {

	var trainNameInput = $('.name').val().trim();
	var destinationInput = $('.destination').val().trim();
	var startTimeInput = $('.first-time').val().trim();
	var frequencyInput = $('.frequency').val().trim();

	if( trainNameInput != "" &&
		destinationInput != "" &&
		startTimeInput != "" &&
		frequencyInput != "" ){

		database.ref().push({
			trainName: trainNameInput,
			destination: destinationInput,
			startTime: startTimeInput,
			frequency: frequencyInput
		});  
		$('input').val('');
    }

	else {
		return false;
	}

	return false;
});

database.ref().on("child_added", function(childSnapshot) {

	var $trainBody = $('#trainRows');
	var $trainRow = $('<tr>');
	var $trainName = $('<td>').html(childSnapshot.val().trainName).appendTo($trainRow);
	var $destination = $('<td>').html(childSnapshot.val().destination).appendTo($trainRow);
	var $frequency = $('<td>').html(childSnapshot.val().frequency).appendTo($trainRow);	
	
	var frequency = childSnapshot.val().frequency;
	var startTime = moment(childSnapshot.val().startTime, "hh:mm").subtract(1, "years");		
	var minAway = frequency - (moment().diff(moment(startTime), "minutes") % frequency);
	
	var nextTrain = $('<td>').html(moment(moment().add(minAway, "minutes")).format("hh:mm")).appendTo($trainRow);
	var minutesAway = $('<td>').html(minAway).appendTo($trainRow);
		
	$trainRow.appendTo($trainBody);


}, function(errorObject) {

	console.log("Errors handled: " + errorObject.code);
});
