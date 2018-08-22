
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
var score = 0;
var trylimit = 2;
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
//Changes tags text content;
colorDisplay.textContent = "LEVEL 1";
//GLOBAL VARIABLES =================================================




initializeGame();






function initializeGame(){
	resetBoard(numberofSquares);
	setupModeButtons();
	setupSquareButtons();
	setupResetButton();
}


//MAIN FUNCTIONS
function setupModeButtons(){
//Adds Easy/Hard mode button event listeners
//=============================================================
	for(var i=0; i<modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.toggle("selected");
			modeButtons[1].classList.toggle("selected");
			if(this.textContent==="Easy"){
				changelevel("PRACTICE");
				trylimit = 2;
			}else{
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
				score += 1;
				checkScore();
				trylimit = 2;
				messageDisplay.textContent = "Correct | Score: " + score + " | Tries: " + trylimit;
				changeColors(clickedColor);
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
					score = 0;
					resetBoard(numberofSquares);
					
				}
			}
		});
	}
//=============================================================

}

function checkScore(){
	if(score === 2){
		changelevel("level2");
	}
	if(score === 3){
		changelevel("level3");
	}
	if(score === 4){
		changelevel("level4");
	}
	if(score === 5){
		changelevel("level5");
	}
	if(score === 6){
		changelevel("level6");
	}
	if(score === 7){
		changelevel("level7");
	}	
	if(score === 8){
		changelevel("level8");
	}	

}


function changelevel(level){
	colorDisplay.textContent = "LEVEL " + level[5];
	if(level === "PRACTICE"){
		numberofSquares = 3;
		drawlevel(level);
	} 
	else if(level === "level1"){
		numberofSquares = 9;
		drawlevel(level);
	}
	else if(level === "level2"){
		numberofSquares = 16;
		drawlevel(level);
	}
	else if(level === "level3"){
		numberofSquares = 25;
		drawlevel(level);
	}
	else if(level === "level4"){
		numberofSquares = 36;
		drawlevel(level);
	}
	else if(level === "level5"){
		numberofSquares = 49;
		drawlevel(level);
	}
	else if(level === "level6"){
		numberofSquares = 64;
		drawlevel(level);
	}
	else if(level === "level7"){
		numberofSquares = 81;
		drawlevel(level);
	}
	else if(level === "level8"){
		numberofSquares = 100;
		drawlevel(level);
	}

}

function drawlevel(level){
	for(var i = 0; i < numberofSquares; i++){
		squares[i].classList = "square " + level;
	}
}




//HELPER FUNCTIONS
function setupResetButton(){
//Adds event listener to reset Button that resets the number of squares
//=============================================================
	resetButton.addEventListener("click", function(){
		changelevel("level1");
		resetBoard(numberofSquares);
		score = 0;
		trylimit = 2;
		messageDisplay.textContent = "Correct | Score: " + score + " | Tries:" + trylimit;
	});
//=============================================================
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


	var r2 = 0;
	var g2 = 0;
	var b2 = 0;

	return ["rgb(" + r + ", " + g + ", " + b + ")", "rgb(" + r2 + ", " + g2 + ", " + b2 + ")"];

}


function resetBoard(numberofSquares){
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



