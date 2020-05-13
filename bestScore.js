let bestScore;

function saveScore(score) {
	bestScore = score;
	localStorage.setItem('bestscore', JSON.stringify(bestScore));
}

function getScore() {
	let scoreStored = localStorage.getItem('bestscore');
	if (scoreStored === null) {
		scoreStored = 0;
	} else {
		scoreStored = JSON.parse(scoreStored);
	}

	return scoreStored;
}
