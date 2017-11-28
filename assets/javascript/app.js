// Initialize Firebase
var config = {
    apiKey: "AIzaSyBh0t93pcXxgq1tpyyZE_S7iJx0MFUn6nU",
    authDomain: "train-c709e.firebaseapp.com",
    databaseURL: "https://train-c709e.firebaseio.com",
    storageBucket: "train-c709e.appspot.com",
  };
  
  
firebase.initializeApp(config);

//firebase database var
var database = firebase.database();

//database stored vars 
var name = "";
var dest = "";
var time = "";
var rate = 0;

//on click for submit btn
//inside on click create .val to store input into vars 

$("#submit").on("click", function(event) {
  event.preventDefault();

  // Saving Form inputs to our variables
  name = $("#input-name").val().trim();
  dest = $("#input-dest").val().trim();
  time = $("#input-time").val().trim();
  rate = $("#input-rate").val().trim();

  //Creating an object to be submitted to the Firebase Database
  var newTrain = {
    name: name,
    dest: dest,
    time: time,
    rate: rate,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  // Pushes the newTrain Data to Firebase
  database.ref().push(newTrain);

  //Clear the Form
  $("#input-name").val("");
  $("#input-dest").val("");
  $("#input-time").val("");
  $("#input-rate").val("");

});

//put data from input into html using childsnapshot from activity
database.ref().on("child_added", function(childSnapShot, prevChildKey) {
  
  console.log(childSnapShot.val());
  //Retrieve Values from Database set to variables
  var trainName = childSnapShot.val().name;
  var trainDest = childSnapShot.val().dest;
  var trainTime = childSnapShot.val().time;
  var trainRate = childSnapShot.val().rate;
  trainRate = parseInt(trainRate);

  // Log the above variables
  console.log("Name: ", trainName);
  console.log("Destination: ", trainDest);
  console.log("Departure: ", trainTime);
  console.log("Frequency: ", trainRate);

  // calculate differen then convert 
  var diffTime = moment.duration(moment().diff(moment(trainTime, "HH:mm")), "milliseconds").asMinutes();
  console.log("Difference in Time" + diffTime);

  var timeRemaining = trainRate - (Math.floor(diffTime) % trainRate);
  console.log(timeRemaining);

  var nextTrain = diffTime > 0 ? moment().add(timeRemaining, 'minutes' ) : moment(trainTime, "HH:mm") ;
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
  
  //minutes until next train arrives, rounding up
  var minTilTrain = Math.ceil(moment.duration(moment(nextTrain).diff(moment()), 'milliseconds').asMinutes());
  console.log("MINUTES TILL TRAIN: " + minTilTrain);

  //convert to HH:mm format from ms 
  nextTrain = moment(nextTrain).format("HH:mm");

  //Write Data From Database to Table
  var newTrainTableRow = "";
  $("#traintimes > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainRate + "</td><td>" + nextTrain + "</td><td>" + minTilTrain + "</td></tr>");
  
});


//