// Initialize Firebase
var config = {
    apiKey: "AIzaSyBh0t93pcXxgq1tpyyZE_S7iJx0MFUn6nU",
    authDomain: "train-c709e.firebaseapp.com",
    databaseURL: "https://train-c709e.firebaseio.com",
    projectId: "train-c709e",
    storageBucket: "train-c709e.appspot.com",
    messagingSenderId: "263975779947"
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

var name = akdjf.val().trim();



//put data from input into html using childsnapshot from activity