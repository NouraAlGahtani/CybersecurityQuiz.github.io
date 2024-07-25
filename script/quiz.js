// Defining questions
var question1 = new question({
	charName: "1. What does the acronym RSA stand for in cryptography?",
	answerOptions: ["Rivest, Shamir, Adleman", "Random Security Algorithm", "Randomized Secure Authentication", "Rivest, Shamir, Algorithm"],
	answer: 0,
	pageNumber: "page-1"
});

var question2 = new question({
	charName: "2. Which of the following is a symmetric key encryption algorithm?",
	answerOptions: ["RSA", "ECC", "AES", "Diffie-Hellman"],
	answer: 2,
	pageNumber: "page-2"
});

var question3 = new question({
	charName: "3. What is the main purpose of a cryptographic hash function?",
	answerOptions: ["Encrypt data", "Generate a random number", "Verify data integrity", "Create a digital signature"],
	answer: 2,
	pageNumber: "page-3"
});

var question4 = new question({
	charName: "4. Which of these is a type of attack on cryptographic algorithms?",
	answerOptions: ["Birthday attack", "Sunset attack", "Rainbow attack", "Dawn attack"],
	answer: 0,
	pageNumber: "page-4"
});

var question5 = new question({
	charName: "5. What is the primary characteristic of Elliptic Curve Cryptography (ECC)?",
	answerOptions: ["Uses large key sizes", "Based on the difficulty of factoring large integers", "Provides strong security with smaller keys", "Uses symmetric keys"],
	answer: 2,
	pageNumber: "page-5"
});

//Defining prototype
function question(option){
	this.charName = option.charName;
	this.answerOptions = option.answerOptions;
	this.answer = option.answer;
	this.pageNumber = option.pageNumber;
}

//Questions html template
var genQuestion = function(x){
	var stage = $('#questions');
	stage.append('<div id="' + x.pageNumber + '" class="page"></div>');

	var questionsPage = $('#' + x.pageNumber);
	questionsPage.append('<h1>Cryptography Quiz</h1><hr/>');
	questionsPage.append('<p class="charName">' + x.charName + '</p>');
	questionsPage.append('<form>');
	questionsPage.append('<input type="radio" name="tv1" value="0" checked>' + x.answerOptions[0] + '<br/>');
	questionsPage.append('<input type="radio" name="tv1" value="1">' + x.answerOptions[1] + '<br/>');
	questionsPage.append('<input type="radio" name="tv1" value="2">' + x.answerOptions[2] + '<br/>');
	questionsPage.append('<input type="radio" name="tv1" value="3">' + x.answerOptions[3] + '<br/>');
	questionsPage.append('</form>');
	questionsPage.append('<div class="feedback"></div>');
	questionsPage.append('<button>next</button>');
}

//variables
var count = 0;
var nextPage = 1;

// calculate score
function showScore(){
	$('.score').append(count + " out of 5");
}

//checking answer
function checkAnswer(x){
	var finalAnswer = $('input:checked').val();
	var feedback = $('.page:visible .feedback');

	if(finalAnswer == x.answer){
		feedback.html('<p style="color: green;">Correct!</p>');
		count++;
	} else {
		feedback.html('<p style="color: red;">Wrong! The correct answer is: ' + x.answerOptions[x.answer] + '</p>');
	}

	if(nextPage == 5){
		setTimeout(function(){
			$('#questions').hide();
			$('#finish').show();
			showScore();
		}, 2000); // Delay to show feedback before moving to results
	} else {
		nextPage++;
		setTimeout(function(){
			$('.page').hide();
			$('#finish').hide();
			$('#page-' + nextPage).show();
		}, 2000); // Delay to show feedback before moving to next question
	}
}

//create a new game and questions
function newGame(){
	var create1 = new genQuestion(question1);
	var create2 = new genQuestion(question2);
	var create3 = new genQuestion(question3);
	var create4 = new genQuestion(question4);
	var create5 = new genQuestion(question5);
}

//restart game
function restart(){
	count = 0;
	nextPage = 1;
	$('#start-page').show();
	$('#page-1').hide();
	$('#page-2').hide();
	$('#page-3').hide();
	$('#page-4').hide();
	$('#page-5').hide();
	$('#finish').hide();
	$('#questions').show();
	$('.score').empty();
	$('#finish').hide();
}

$(document).ready(function(){
	// when the start button is clicked
	$('#start-page button').click(function(){
		$('#start-page').hide();
		$('#page-1').show();
		$('#page-2').hide();
		$('#page-3').hide();
		$('#page-4').hide();
		$('#page-5').hide();
		$('#finish').hide();
	});

	//generating the questions
	newGame();

	//events when next button is clicked
	$('#page-1 button').click(function(){
		checkAnswer(question1);
	});

	$('#page-2 button').click(function(){
		checkAnswer(question2);
	});

	$('#page-3 button').click(function(){
		checkAnswer(question3);
	});

	$('#page-4 button').click(function(){
		checkAnswer(question4);
	});

	$('#page-5 button').click(function(){
		checkAnswer(question5);
	});

	// event when try again is clicked
	$('#finish button').click(function(){
		restart();
	});
});
