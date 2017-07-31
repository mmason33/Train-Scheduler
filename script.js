  // Initialize Firebase
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

$('.btn-primary').click( function (e) {

	e.preventDefault();
	var name = $('.name').val().trim();
	var role = $('.role').val().trim();
	var startDate = $('.start-date').val().trim();
	var rate = $('.rate').val().trim();

	database.ref().push({
		name: name,
		role: role,
		startDate: startDate,
		rate: rate,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});

	$('input').val('');

});


database.ref().on("child_added", function(snapshot){
	$("#name").append('<p>'+ snapshot.val().name +'</p>');
	$("#role").append('<p>'+ snapshot.val().role +'</p>');
	$("#date").append('<p>'+ snapshot.val().startDate +'</p>');
	$("#rate").append('<p>'+ snapshot.val().rate +'</p>');
	var date1 = moment(snapshot.val().startDate, "DD/MM/YYYY");
	console.log(date1);
	var diff = moment().diff(date1,"months");
	console.log(diff);
	$("#monthsworked").append('<p>' + diff + '</p>')
	var total = diff * parseInt(snapshot.val().rate)
	$("#totalbilled").append('<p>' + total + '</p>')
})