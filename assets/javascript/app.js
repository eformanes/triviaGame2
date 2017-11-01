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

var clockRunning = false;

//Holds the timer.  Does nothing until game is reset.
//var windowTimeout;

// Used to hold the setInterval value that fires every second?
var intervalID;

var timeRemaining = 30;

function countDown(){
	if(timeRemaining === 0){
		$("#timeRemaining").html(timeRemaining);
		endGame();
	}

	if(clockRunning){
		timeRemaining --;
		$("#timeRemaining").html(timeRemaining);	
	}
	

}



//This looks dumb but need a way to 
// var	valueOfA = 1;


// var question1Ans = 'z';

// $(".question1Answer").change(checkQuestion1Changed);


// function checkQuestion1Changed(){
// 	question1Ans = $(".question1Answer:checked").val();
// 	console.log("Changed 1")
// }

// //$(".question0Answer").change(checkQuestion0Changed);
// $("form").on("change", "input.question0Answer",function(){
// 	question1Ans = $(".question0Answer:checked").val();
// 	console.log("Change 0 live!");
// })

// function checkQuestion0Changed(){
// 	console.log("Changed 0!");
// }


///THIS WORKS on radio buttons that have been added dynamically!!
///Function below is used to push the answer selected to the correct answers[] array index.
$(document).on('change', 'input', function() {

	// Console logs below were for testing values that were returned
	// console.log("Input clicked!");
	// console.log(this.name);
	// console.log(this.value);

	//var currentAnswerIndex = parseInt(this.name);
	
	//Line below is the only thing required to push selected letter in the correct index.  this.name is actually a string but is auto converted into an int/number for index
	//This only works because I took the shortcut of giving each radio button the name of the question #(starting with 0)
	answers[this.name] = this.value;

})

//clicking the End Game button is one way to end the game.
$('#endGameBtn').on("click", endGame);

//
$('#resetGameBtn').on("click", resetGame);

function displayQuestionsAndAnswers(){
	
	//Create a string that will be built and then appended too.
	var html='';

	// for(var i=0; i<questionsAndAnswers.length;i++){
		

	// 	//Dynamiclly build new Div to hold Question
	// 	html += '<div id="question' + i + '">';
	// 	//Dynamically Build the question
	// 	html += '<p id="question'+ i + 'Text">' +questionsAndAnswers[i].question +'</p>';

	// 	//Build the answer Form tag
	// 	html += '<form>';

		
	// 	for(var key in questionsAndAnswers[i].answers){
			
	// 		html += '<input class="question' + i +'Answer" type="radio" name="'+ i + '" value="'+ key +'">' + questionsAndAnswers[i].answers[key] + '</input>';
	// 	}
		

	// 	//Close the answer Form tag
	// 	html += '</form>';


	// 	//Last thing to close out the question div.
	// 	html += '</div>';
	// }

	for(var i=0; i<questionsAndAnswers.length;i++){
		
		//New question card
		html += '<div class="card border-primary">';
		//Question Number
		html += '<div class="card-header bg-primary" id="question' + i + '"> Question Number ' + (i+1) + '</div>';
		//Question card body
		html += '<div class="card-body">';
		//Question Text row
		html += '<div class="row">';
		//Question Text content
		html += '<div class="col"><p>' + questionsAndAnswers[i].question  +'</p></div>';
		// Close out question Text Row
		html += '</div>';
		
		// Begin Answers row
		html += '<div class="row">';
		html += '<div class="col">';
		// Inner card to hold answers
		html += '<div class="card">';		
		html += '<div class="card-body">';

		// build the answer radio buttons
		for(var key in questionsAndAnswers[i].answers){
			
			html += '<input class="question' + i +'Answer" type="radio" name="'+ i + '" value="'+ key +'">' + questionsAndAnswers[i].answers[key] + '</input><br>';
		}

		// Close out the card body div and remaining 6 divs
		html += '</div></div></div></div></div></div>';
		// Add a space between each question.
		html += '<p></p>'
		//console.log(html);


	}

	// Append the html sting built above.
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
		if (questionsAndAnswers[i].correctAnswer === answers[i]) {
			correctAnswerCount++;
			//Make background header of correct question cards Green
			$("#question"+i).addClass("bg-success");
		}
		else{
			//Make background header of incorrect question cards Red.
			$("#question"+i).addClass("bg-danger");
		}
	}
	alert("You got " + correctAnswerCount + " correct!");
	alert("Answers marked in red are incorrect.  Correct answers are marked with Green.  Click Reset Game Button to play again. ");
	//resetGame();
}


$("#startGameButton").on("click", resetGame);

//displayQuestionsAndAnswers();
