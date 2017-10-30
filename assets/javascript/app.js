var questionsAndAnswers = [
	// Question 1
	{
		question: "What is the capital of California?",
		answers: {
			A: "Sacramento",
			B: "Irvine",
			C: "San Diego",
			D: "Torrance"
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
var windowTimeout;

// Used to hold the setInterval value that fires every second?
var intervalID;

var timeRemaining = 30;

function countDown(){
	timeRemaining --;
	$("#timeRemaining").html(timeRemaining);
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
$('#endGame').on("click", endGame);

function displayQuestionsAndAnswers(){
	
	//Create a string that will be built and then appended too.
	var html='';

	for(var i=0; i<questionsAndAnswers.length;i++){
		

		//Dynamiclly build new Div to hold Question
		html += '<div id="question' + i + '">';
		//Dynamically Build the question
		html += '<p id="question'+ i + 'Text">' +questionsAndAnswers[i].question +'</p>';

		//Build the answer Form tag
		html += '<form>';

		//Dynamically build the answer input tags using a for loop
		//For now assume 4 answer options.  Later figure out how to count number of possible answers
		// Object.keys(questionsAndAnswers[i].answers).length
		// for(var j=0; Object.keys(questionsAndAnswers[i].answers).length;j++){
		// 	$("#questionHolder").append('<input class="question>' + j +'Answer" type="radio" name="question'+ j + 'Ans" value="'+ 'Z"' + questionsAndAnswers[i].answers.A + '</input>');	
		// }

		//Loop below will go through each question's answer object and dynamically build the answer radio buttons
		for(var key in questionsAndAnswers[i].answers){
			//console.log(key, questionsAndAnswers[i].answers[key]);

			//Console logs below to troubleshoot issues with building Radio buttons dynamically
			// console.log(i);
			// console.log(key);
			// console.log(questionsAndAnswers[i].answers[key]);

			//html += '<input class="question' + i +'Answer" type="radio" name="question'+ i + 'Ans" value="'+ key +'">' + questionsAndAnswers[i].answers[key] + '</input>';
			//Made change below due to idea of using name as the index for the answers array.
			html += '<input class="question' + i +'Answer" type="radio" name="'+ i + '" value="'+ key +'">' + questionsAndAnswers[i].answers[key] + '</input>';
		}
		

		//Close the anser Form tag
		html += '</form>';


		//Last thing to close out the question div.
		html += '</div>';
	}

	$("#questionHolder").append(html);
}

function resetGame(){
	$("#questionHolder").html('');
	answers = [];
	displayQuestionsAndAnswers();
	//start Timers
	timeRemaining = 30;
	intervalID = setInterval(countDown, 1000);
	windowTimeout = setTimeout(endGame, 30000);
	
	
}


function endGame(){
	// Clear the Timeouts if end game early
	clearTimeout(windowTimeout);
	clearTimeout(intervalID);

	var correctAnswerCount = 0;
	for(var i=0;i < questionsAndAnswers.length ;i++){
		if (questionsAndAnswers[i].correctAnswer === answers[i]) {
			correctAnswerCount++;
		}
	}
	alert("You got " + correctAnswerCount + " correct!");
	resetGame();
}


$("#startGameButton").on("click", resetGame);

//displayQuestionsAndAnswers();
