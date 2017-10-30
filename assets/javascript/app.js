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
			A: "Sacramento",
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
var answers = ['z','z','z','z','z'];

//This looks dumb but need a way to 
var	valueOfA = 1;


var question1Ans = 'z';

$(".question1Answer").change(checkQuestion1Changed)


function checkQuestion1Changed(){
	question1Ans = $(".question1Answer:checked").val();
}



function displayQuestionsAndAnswers(){
	

	for(var i=0; i<questionsAndAnswers.length;i++){
		//Dynamiclly build new Div to hold Question
		$("#questionHolder").append('<div id="question' + i + '">');
		//Dynamically Build the question
		$("#questionHolder").append('<p id="question'+ i + 'Text">' +questionsAndAnswers[i].question +'</p>');

		//Build the answer Form tag
		$("#questionHolder").append('<form>');

		//Dynamically build the answer input tags using a for loop
		//For now assume 4 answer options.  Later figure out how to count number of possible answers
		// Object.keys(questionsAndAnswers[i].answers).length
		// for(var j=0; Object.keys(questionsAndAnswers[i].answers).length;j++){
		// 	$("#questionHolder").append('<input class="question>' + j +'Answer" type="radio" name="question'+ j + 'Ans" value="'+ 'Z"' + questionsAndAnswers[i].answers.A + '</input>');	
		// }
		

		//Close the anser Form tag
		$("#questionHolder").append('</form>');


		//Last thing to close out the question div.
		$("#questionHolder").append('</div>');
	}
}
