var questionsAndAnswers = [
	// Question 1
	{
		question: "What does eq mean in jQuery?",
		answers: {
			A: "Method that selects an element with a specific index number or matched elements.",
			B: "Used to compare if two numbers are equal.",
			C: "Not a valid jQuery method.",
			D: "Used to compare if two objects are equal."
		},
		correctAnswer: "A"
	},
	// Question 2
	{
		question: "What is the capital of Australia?",
		answers: {
			A: "Los Angeles",
			B: "Opera House",
			C: "Canberra",
			D: "Brizbane"
		},
		correctAnswer: "C"
	},
	// Question 3
	{
		question: "What is the only manmade object that is observable from the moon?",
		answers: {
			A: "Pyrimad",
			B: "The Great Wall of China",
			C: "Luxor hotel",
			D: "Giant Rock"
		},
		correctAnswer: "B"
	},
	// Question 4
	{
		question: "What is the largest fish in the ocean?",
		answers: {
			A: "Big Seal",
			B: "Killer Whale",
			C: "Donkey Kong",
			D: "Whale Shark"
		},
		correctAnswer: "D"
	},
	// Question 5
	{
		question: "What was the first planet to be discovered using the telescope?",
		answers: {
			A: "Mars",
			B: "Earth",
			C: "Uranus",
			D: "Saturn"
		},
		correctAnswer: "C"
	}

];

// initialize anwers array with an function later
// For now, initialize first 5 with z.  z will mean not yet selected.
var answers = ['z','z','z','z','z'];
// Used to hold shuffled question order
var randomizedQuestionArray = [];

var clockRunning = false;


// Used to hold the setInterval value that fires every second
var intervalID;
// Initializes the time to answer all questions
var timeRemaining = 30;



function countDown(){
	if(timeRemaining === 0){
		$("#timeRemaining").html(timeRemaining);
		//Ends game when time remaining hits 0
		endGame();
	}

	if(clockRunning){
		timeRemaining --;
		$("#timeRemaining").html(timeRemaining);	
	}
	

}



///THIS WORKS on radio buttons that have been added dynamically!!
///Function below is used to push the answer selected to the correct answers[] array index.
$(document).on('change', 'input', function() {

	// Console logs below were for testing values that are detected from radio button changes
	 console.log("Input clicked!");
	 console.log(this.name);
	 console.log(this.value);

	//Line below is the only thing required to push selected letter in the correct index.  this.name is actually a string but is auto converted into an int/number for index
	//This only works because I took the shortcut of giving each radio button the name of the question #(starting with 0)
	answers[this.name] = this.value;

})

//Clicking the End Game Button is one way to end the game.
$('#endGameBtn').on("click", endGame);

//Reset the game when the Reset Button is clicked
$('#resetGameBtn').on("click", resetGame);


//  Function below dynamically builds the questions cards that will be displayed
function displayQuestionsAndAnswers(){
	//  Enhancement:  Add the ability to change the number of questions
	var numberOfQuestions = 5;
	
	//  Resets the randomized Array
	randomizedQuestionArray = [];

	//Create an ordered array that will hold a unique index for each question
	for(var j=0; j < numberOfQuestions;j++){
		randomizedQuestionArray[j] = j;

	}

	//Shuffle the ordered array so questions will be random but not duplicated
	shuffle(randomizedQuestionArray);



	
	//Create a string that will be built and then appended too.
	var html='';

	
	// Actually builds the question cards
	//for(var i=0; i<questionsAndAnswers.length;i++){
	for(var i=0; i<randomizedQuestionArray.length;i++){
		//Enhacement:  Re-write below using jQuery instead of appending to html string

		//New question card
		html += '<div class="card border-primary" id="questionCard'+ i +'" >';
		//Question Number
		html += '<div class="card-header bg-primary" id="question' + i + '"> Question Number ' + (i+1) + '</div>';
		//Question card body
		html += '<div class="card-body">';
		//Question Text row
		html += '<div class="row">';
		//Question Text content
		html += '<div class="col"><p>' + questionsAndAnswers[randomizedQuestionArray[i]].question  +'</p></div>';
		// Close out question Text Row
		html += '</div>';
		
		// Begin Answers row
		html += '<div class="row">';
		html += '<div class="col">';
		// Inner card to hold answers
		html += '<div class="card">';		
		html += '<div class="card-body">';

		// Build the answer radio buttons by pulling the correct text and answer from the question objects
		for(var key in questionsAndAnswers[randomizedQuestionArray[i]].answers){
			
			html += '<input class="question' + i +'Answer" type="radio" name="'+ i + '" value="'+ key +'">' + questionsAndAnswers[randomizedQuestionArray[i]].answers[key] + '</input><br>';
		}

		// Close out the card body div and remaining 6 divs
		html += '</div></div></div></div></div></div>';
		// Add a space between each question.
		html += '<p></p>'
		//console.log(html);


	}

	// Append the html sting built above and display the question cards built above.
	$("#questionHolder").append(html);
}

function resetGame(){
	$("#questionHolder").html('');
	answers = [];
	displayQuestionsAndAnswers();
	//start Timers
	clearTimeout(intervalID);
	timeRemaining = 30;
	clockRunning = true;
	intervalID = setInterval(countDown, 1000);
	//windowTimeout = setTimeout(endGame, 30000);
	
	
}


function endGame(){
	// Clear the Timeouts if end game early
	//clearTimeout(windowTimeout);
	clockRunning= false;
	clearTimeout(intervalID);
	timeRemaining = 0;
	$("#timeRemaining").html(timeRemaining);

	var correctAnswerCount = 0;
	for(var i=0;i < questionsAndAnswers.length ;i++){
		//if (questionsAndAnswers[i].correctAnswer === answers[i]) {
		if (questionsAndAnswers[randomizedQuestionArray[i]].correctAnswer === answers[i]) {
			correctAnswerCount++;
			//Make background header and border of correct question cards Green
			$("#question"+i).addClass("bg-success");
			$("#questionCard"+i).addClass("border-success");
		}
		else{
			//Make background header and border of incorrect question cards Red.
			$("#question"+i).addClass("bg-danger");
			$("#questionCard"+i).addClass("border-danger");
		}
	}
	alert("You got " + correctAnswerCount + " correct!");
	alert("Red questions are incorrect. Green are correct.  Click Reset Game Button to play again with random questions. ");
	//resetGame();
}

//  Kicks off the initial game
$("#startGameButton").on("click", resetGame);

//  Fisher-Yates (aka Knuth) Shuffle algorithm 
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
