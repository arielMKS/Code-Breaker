var answer = document.getElementById('answer').value; // this section get loaded first
var attempt = document.getElementById('attempt').value;
var results = document.getElementById('results');
var message = document.getElementById('message');
var code = document.getElementById('code');
var guessingDiv = document.getElementById('guessing-div');
var replayDiv = document.getElementById('replay-div');


// this function runs when Submit button is clicked
function guess() {

  var input = document.getElementById('user-guess').value; // keep this code inside guess() so user guess is available

  if (!attempt && !answer) { // will run only on init
    setHiddenFields();
  }

  if (validateInput(input)) { // validateInput returns true if input length===4

    attempt += 1;             // increment attempt by 1
    console.log("Answer", answer)
    console.log("Input", input)
    console.log("Attempt",attempt);

    if (getResults(input)) {    // true if user got right answer
      setMessage("You Win!");
      showAnswer(true);         // display the answer
      showReplay();             // display button to prompt restart
    } else if (attempt >= 10){  // true if user made 10 incorrect attempts
      setMessage("You Lose! :(");
      showAnswer(true);         // display the answer
      showReplay();             // display button to prompt restart
    } else setMessage("Incorrect, try again."); // default display

  } else {
    setMessage("Guesses must be exactly 4 characters long."); // executes if user input length != 4
  }
} // end function

// ================== this function displays button to restart game after its over
function showReplay() {
  guessingDiv.style.display = "none"; // hide user input and button
  replayDiv.style.display = "block";  // show restart button
} // end function

// ================== this function displays the answer after game is over
function showAnswer(bool) {

  code.firstElementChild.innerHTML = answer; // add text to the <strong> tag

  if(bool) {
    code.classList.add("success");  // class .success sets text color to green
  } else {
    code.classList.add("failure");  // class .failure sets text color to red
  }
}

// ================== this function puts together an html string of glyphs
function getResults(input) {

  var counter = 0; // count correctly guessed characters, return true if counter===4
  var htmlStr = '<div class="row"><span class="col-md-6">' + input +
    '</span><div class="col-md-6">';

  for(var i = 0; i<4; i++) {
      if (answer[i] == input[i]) {
        htmlStr += '<span class="glyphicon glyphicon-ok"></span>';  // the ok icon
        counter++;
      } else if (answer.indexOf(input[i]) >= 0) {
        htmlStr += '<span class="glyphicon glyphicon-transfer"></span>';  // icon
      } else {
        htmlStr += '<span class="glyphicon glyphicon-remove"></span>';  // the x icon
      }
  }
  htmlStr += '</div></div>'; // close divs; advance to next line on page
  results.innerHTML += htmlStr;

  return counter === 4;

} // end function

// ================== this function validates user input length===4
function validateInput(val) {
  return val.length === 4;
} // end function

// ================== this generic function displays some message
function setMessage(msg) {
  message.innerHTML = msg;
} // end function

// ================== this function generates a number, returns the number as string length is 4
function setHiddenFields() {

  attempt = 0;    // initialize attempt here

  var randomNum = Math.floor((Math.random() * 9999) + 0);

  var randomStr = ("000000000" + randomNum.toString()); // pad string with leading zeros
  randomStr = randomStr.substr(randomStr.length-4, randomStr.length); // trim last 4 of string
  answer = "3926"; // set the answer

} // end function
