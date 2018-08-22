
//GLOBAL VARIABLES =================================================
var numberofSquares = 9;
var randomNumber;
var colors;
//List of all tags with the ".square" class
var squares = document.querySelectorAll(".square");
var pickedColor;
//Tag with the "#colorDisplay" id
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var highscoreDisplay = document.querySelector("#highscoreDisplay");
var score = 0;
var colorAlter = 10;
var trylimit = 2;
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var practiceMode = false;
var highscore = 0;
colorDisplay.textContent = "LEVEL 1";

//Changes tags text content;
//GLOBAL VARIABLES =================================================




initializeGame();


function initializeGame(){
	resetBoard(numberofSquares);
	setupModeButtons();
	setupSquareButtons();
	setupResetButton();
}


//SETUP FUNCTIONS
function setupModeButtons(){
//Adds Easy/Hard mode button event listeners
//=============================================================
	for(var i=0; i<modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.toggle("selected");
			modeButtons[1].classList.toggle("selected");
			if(this.textContent==="Practice"){
				practiceMode = true;
				changelevel("PRACTICE");
				trylimit = 2;
			}else{
				practiceMode = false;
				changelevel("level1");
				trylimit = 2;
			}
			score=0;
			resetBoard(numberofSquares);

		});
	}
//=============================================================

}

function setupSquareButtons(){
//Loops through the ".square" list which selects each tag within
//Adds event listener to each Square that makes them disapear or shows them the win screen
//=============================================================
	for(var i = 0; i < squares.length; i++){
		//add background to each square
		squares[i].style.backgroundColor = colors[i];

		//add event listener to each square
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;

			if(clickedColor === pickedColor){
				if(practiceMode === false){
					score += 1;
				}
				checkScore();
				trylimit = 2;
				messageDisplay.textContent = "Correct | Score: " + score + " | Tries: " + trylimit;
				h1.style.backgroundColor = pickedColor;
				resetBoard(numberofSquares);
			}

			else{
				if(trylimit > 1){
					this.style.backgroundColor = "#232323";
					trylimit -=1;
					messageDisplay.textContent = "Correct | Score: " + score + " | Tries: " + trylimit;
				}
				else{
					this.style.backgroundColor = "#232323";
					colorDisplay.textContent = "TRY AGAIN";
					checkHighscore();
					score = 0;
					endingAnimation();
				}
			}
		});
	}
//=============================================================

}


function setupResetButton(){
//Adds event listener to reset Button that resets the number of squares
//=============================================================
	resetButton.addEventListener("click", function(){
		if(practiceMode === true){
			changelevel("PRACTICE");
		}else{
			changelevel("level1");
		}
		resetBoard(numberofSquares);
		score = 0;
		trylimit = 2;
		messageDisplay.textContent = "Correct | Score: " + score + " | Tries:" + trylimit;
	});
//=============================================================
}






//HELPER FUNCTIONS===============================================================================================================================

function checkHighscore(){
	if(score > highscore){
		highscore = score;
	}
}


function endingAnimation(){
	setTimeout(function(){
		changeColors("#232323");
		squares[randomNumber].style.backgroundColor = pickedColor;
	}, 600);
	setTimeout(function(){
		if(practiceMode === true){
			changelevel("PRACTICE");
		}else{
			changelevel("level1");
		}
		resetBoard(numberofSquares);
	}, 2000);

}



//feature that deletes wrongly picked colors
function changeColors(color){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}




//function that picks a random color from colors array
function pickRandom(){
	var random = Math.floor(Math.random() * numberofSquares);
	return random;
}




function generateRandomColors(num, answer){
	var colors = [];
	var colorList = randomRGB();
	var orig = colorList[0];
	var diff = colorList[1];

	for(var i = 0; i < num; i++) {
		colors.push(orig);
	}

	colors[answer] = diff;
	return colors;
}




function randomRGB(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	var origColor = "rgb(" + r + ", " + g + ", " + b + ")";
	var altColor;
	
	if(tinycolor(origColor).isLight()){
		var altColor = tinycolor(origColor).darken(colorAlter);
	} else{
		var altColor = tinycolor(origColor).lighten(colorAlter);
	}
	return [origColor.toString(), altColor.toString()];

}





function resetBoard(numberofSquares){
	highscoreDisplay.textContent = "highscore: " + highscore;
	randomNumber = pickRandom();
	colors = generateRandomColors(numberofSquares, randomNumber);
	pickedColor = colors[randomNumber];
	trylimit=2;
	messageDisplay.textContent = "Correct | Score: " + score + " | Tries: " + trylimit;
	//IMPORTANT NULLIFIES THE EXTRA SQUARES
	for(var i=0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		}
		else{
			squares[i].style.display = "none";
		}
	}
	resetButton.textContent = "New Colors";
	h1.style.backgroundColor = pickedColor;
}







function checkScore(){
	if(score === 5){
		changelevel("level2");
	}
	if(score === 10){
		changelevel("level3");
	}
	if(score === 15){
		changelevel("level4");
	}
	if(score === 20){
		changelevel("level5");
	}
	if(score === 25){
		changelevel("level6");
	}
	if(score === 30){
		changelevel("level7");
	}	
	if(score === 35){
		changelevel("level8");
	}	

}





function changelevel(level){
	if(level === "PRACTICE"){
		colorDisplay.textContent = "PRACTICE MODE";
	} else{
		colorDisplay.textContent = "LEVEL " + level[5];
	}
	if(level === "PRACTICE"){
		numberofSquares = 3;
	} 
	else if(level === "level1"){
		numberofSquares = 9;
	}
	else if(level === "level2"){
		numberofSquares = 16;
	}
	else if(level === "level3"){
		numberofSquares = 25;
	}
	else if(level === "level4"){
		numberofSquares = 36;
	}
	else if(level === "level5"){
		numberofSquares = 49;
	}
	else if(level === "level6"){
		numberofSquares = 64;
	}
	else if(level === "level7"){
		numberofSquares = 81;
	}
	else if(level === "level8"){
		numberofSquares = 100;
	}
	drawlevel(level);
}

function drawlevel(level){
	for(var i = 0; i < numberofSquares; i++){
		squares[i].classList = "square " + level;
	}
}


