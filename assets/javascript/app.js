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

  // calculate difference then convert. use train activity example code


  //put data into table
  var newTrainTableRow = "";
  $("#traintimes > tbody").append("<tr><td>" + trainName + "</td><td>");
  
});


//