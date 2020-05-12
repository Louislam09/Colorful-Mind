let timeContainer = document.querySelector('.time-container');
let difficultyDiv = document.querySelector('.difficulty');
let timeDiv = document.querySelector('.time-value');
let wordDiv = document.querySelector('.word');
let bestscoreDiv = document.querySelector('.best-score');
let scoreDiv = document.querySelector('.score');
let tryDiv = document.querySelector('.tries');
let instructionDiv = document.querySelector('.instruction');
let playButton = document.querySelector('.play-button');
let restartButton = document.querySelector('.restart-button');
let incorrectButton = document.querySelector('.incorrect-button');
let correctButton = document.querySelector('.correct-button');

let easyMode = document.getElementById('easy');
let hardMode = document.getElementById('hard');
let frMode = document.getElementById('fr');

let correctSound = new Audio('sound/correct.mp3');
let incorrectSound = new Audio('sound/incorrect.mp3');

let colorsName = [ 'Verde', 'Rojo', 'Azul', 'Blanco' ];
let couleursPrenom = [ 'Vert', 'Rouge', 'Bleu', 'Blanc' ];
let colors = [ 'Green', 'red', 'blue', 'white' ];
let choseColorName;
let choseColor;

let score = 0;
let tries = 3;
let timeValue = 100;
let timer = 25;

function gameStart() {
	hiddenSection(timeContainer);
	hiddenSection(bestscoreDiv);

	buttonEvent();

	scoreDiv.innerText = `score: ${score}`;
	tryDiv.innerText = `Intentos: ${tries}`;
}

function activeMode() {
	if (easyMode.checked === true) {
		timer = 25;
	} else {
		timer = 15;
	}
}

function assignWord() {
	if (frMode.checked) colorsName = couleursPrenom;
	choseColorName = colorsName[Math.floor(Math.random() * colorsName.length)];
	// chosecouleursPrenom = couleursPrenom[Math.floor(Math.random() * couleursPrenom.length)];

	choseColor = colors[Math.floor(Math.random() * colors.length)];

	wordDiv.innerText = choseColorName;

	wordDiv.style.color = choseColor;

	hiddenSection(instructionDiv);
	hiddenSection(difficultyDiv);
	hiddenSection(playButton);
	hiddenSection(restartButton);
	showSection(timeContainer);
	showSection(wordDiv);
	showSection(incorrectButton);
	showSection(correctButton);

	gameOver();
}

function checkCorrect() {
	if (colorsName.indexOf(choseColorName) === colors.indexOf(choseColor)) {
		score++;
		timeValue = 100;
		scoreDiv.innerText = `score: ${score}`;
		wordDiv.classList.add('correct-word');
		correctSound.currentTime = 0;
		correctSound.play();
	} else {
		tries--;
		timeValue = 100;
		tryDiv.innerText = `Intentos: ${tries}`;
		wordDiv.classList.add('incorrect-word');
		incorrectSound.currentTime = 0;
		incorrectSound.play();
	}
	setTimeout(() => {
		if (wordDiv.classList.contains('correct-word')) wordDiv.classList.remove('correct-word');
		if (wordDiv.classList.contains('incorrect-word')) wordDiv.classList.remove('incorrect-word');

		assignWord();
	}, 500);
}
function checkIncorrect() {
	if (colorsName.indexOf(choseColorName) !== colors.indexOf(choseColor)) {
		score++;
		timeValue = 100;
		scoreDiv.innerText = `score: ${score}`;
		wordDiv.classList.add('correct-word');
		correctSound.currentTime = 0;
		correctSound.play();
	} else {
		tries--;
		timeValue = 100;
		tryDiv.innerText = `Intentos: ${tries}`;
		wordDiv.classList.add('incorrect-word');
		incorrectSound.currentTime = 0;
		incorrectSound.play();
	}
	setTimeout(() => {
		if (wordDiv.classList.contains('correct-word')) wordDiv.classList.remove('correct-word');
		if (wordDiv.classList.contains('incorrect-word')) wordDiv.classList.remove('incorrect-word');

		assignWord();
	}, 500);
}

function gameOver() {
	if (tries <= 0) {
		if (score > getScore()) saveScore(score);
		bestscoreDiv.innerText = `Best Score: ${getScore()}`;

		timeValue = 0;
		wordDiv.innerText = 'GAMEOVER';
		wordDiv.style.color = 'red';

		wordDiv.classList.add('hiddenPseudo');
		hiddenSection(correctButton);
		hiddenSection(incorrectButton);
		showSection(restartButton);
		showSection(bestscoreDiv);
	}
}

function restartGame() {
	if (wordDiv.classList.contains('hiddenPseudo')) wordDiv.classList.remove('hiddenPseudo');

	score = 0;
	tries = 3;
	timeValue = 100;
	scoreDiv.innerText = `score: ${score}`;
	tryDiv.innerText = `Intentos: ${tries}`;

	showSection(correctButton);
	showSection(incorrectButton);
	hiddenSection(restartButton);
	assignWord();
}

function buttonEvent() {
	playButton.addEventListener('click', activeMode, { once: true });
	playButton.addEventListener('click', timeLoad, { once: true });
	playButton.addEventListener('click', assignWord);
	restartButton.addEventListener('click', restartGame);
	correctButton.addEventListener('click', checkCorrect);
	incorrectButton.addEventListener('click', checkIncorrect);
}

function timeLoad() {
	let t = setInterval(() => {
		timeValue -= 1;

		if (timeValue < 30) timeDiv.style.backgroundColor = 'red';
		if (timeValue > 30) timeDiv.style.backgroundColor = 'green';

		timeDiv.style.width = `${timeValue}%`;

		if (timeValue === 0 && tries > 0) {
			tries--;
			tryDiv.innerText = `Intentos: ${tries}`;

			timeValue = 100;
			wordDiv.classList.add('incorrect-word');
			incorrectSound.currentTime = 0;
			incorrectSound.play();
			// assignWord();
			setTimeout(() => {
				if (wordDiv.classList.contains('correct-word')) wordDiv.classList.remove('correct-word');
				if (wordDiv.classList.contains('incorrect-word')) wordDiv.classList.remove('incorrect-word');

				assignWord();
			}, 500);
		}
	}, timer);

	if (timeValue === 0) {
		clearInterval(t);
	}
}

function showSection(element) {
	element.style.visibility = 'visible';
}
function hiddenSection(element) {
	element.style.visibility = 'hidden';
}

gameStart();
