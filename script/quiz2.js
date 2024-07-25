// Defining questions
var question1 = new question({
	charName: "1. What is the main goal of ethical hacking?",
	answerOptions: ["To cause disruption and damage", "To identify and fix security vulnerabilities", "To steal sensitive information", "To showcase hacking skills"],
	answer: 1,
	pageNumber: "page-1"
});

var question2 = new question({
	charName: "2. Which type of hacker has legal permission to test the security of systems?",
	answerOptions: ["Black hat hacker", "White hat hacker", "Grey hat hacker", "Script kiddie"],
	answer: 1,
	pageNumber: "page-2"
});

var question3 = new question({
	charName: "3. What is a common technique used by ethical hackers to gain unauthorized access to systems?",
	answerOptions: ["Phishing", "Data encryption", "Social engineering", "Cloud computing"],
	answer: 2,
	pageNumber: "page-3"
});

var question4 = new question({
	charName: "4. Which tool is commonly used for network scanning by ethical hackers?",
	answerOptions: ["Wireshark", "Metasploit", "Nmap", "John the Ripper"],
	answer: 2,
	pageNumber: "page-4"
});

var question5 = new question({
	charName: "5. What is a 'penetration test'?",
	answerOptions: ["An attempt to steal data", "A method to disrupt services", "A test to evaluate the security of a system by simulating an attack", "A technique to encrypt data"],
	answer: 2,
	pageNumber: "page-5"
});

// Defining prototype
function question(option){
	this.charName = option.charName;
	this.answerOptions = option.answerOptions;
	this.answer = option.answer;
	this.pageNumber = option.pageNumber;
}

// Questions HTML template
var genQuestion = function(x){
	var stage = $('#questions');
	stage.append('<div id="' + x.pageNumber + '" class="page"></div>');

	var questionsPage = $('#' + x.pageNumber);
	questionsPage.append('<h1>Ethical Hacking Quiz</h1><hr/>');
	questionsPage.append('<p class="charName">' + x.charName + '</p>');
	questionsPage.append('<form>');
	questionsPage.append('<input type="radio" name="tv1" value="0" checked>' + x.answerOptions[0] + '<br/>');
	questionsPage.append('<input type="radio" name="tv1" value="1">' + x.answerOptions[1] + '<br/>');
	questionsPage.append('<input type="radio" name="tv1" value="2">' + x.answerOptions[2] + '<br/>');
	questionsPage.append('<input type="radio" name="tv1" value="3">' + x.answerOptions[3] + '<br/>');
	questionsPage.append('</form>');
	questionsPage.append('<button>Next</button>');
}

// Variables
var count = 0;
var nextPage = 1;

// Calculate score
function showScore(){
	$('.score').append(count + " out of 5");
}

// Checking answer
function checkAnswer(x){
	var finalAnswer = $('input:checked').val();
	if(nextPage == 5 && finalAnswer == x.answer){
		count++;
		$('#questions').hide();
		$('#finish').show();
		showScore();
	} else if(nextPage == 5){
		$('#questions').hide();
		$('#finish').show();
		showScore();
	} else if(finalAnswer == x.answer){
		count++;
		nextPage++;
		$('.page').hide();
		$('#finish').hide();
		$('#page-' + nextPage).show();
	} else {
		nextPage++;
		$('.page').hide();
		$('#finish').hide();
		$('#page-' + nextPage).show();
	}
}

// Create a new game and questions
function newGame(){
	var create1 = new genQuestion(question1);
	var create2 = new genQuestion(question2);
	var create3 = new genQuestion(question3);
	var create4 = new genQuestion(question4);
	var create5 = new genQuestion(question5);
}

// Restart game
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
	// When the start button is clicked
	$('#start-page button').click(function(){
		$('#start-page').hide();
		$('#page-1').show();
		$('#page-2').hide();
		$('#page-3').hide();
		$('#page-4').hide();
		$('#page-5').hide();
		$('#finish').hide();
	});

	// Generating the questions
	newGame();

	// Events when next button is clicked
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

	// Event when try again is clicked
	$('#finish button').click(function(){
		restart();
	});
});
