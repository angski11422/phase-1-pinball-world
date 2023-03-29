fetchGames();
let currentGame;

const gameImg = document.querySelector('#detail-image');
const highScore = document.querySelector('#detail-high-score');
const gameTitle = document.querySelector('#detail-title');

function fetchGames() {
    fetch('http://localhost:3000/games')
    .then(resp => resp.json())
    .then((data) => {
        data.forEach((games) => {
            displayGames(games);
        })
        gameDetails(data[0]);
        updateHighScore();
    })
}

function displayGames(games) {
    const gameList = document.querySelector('.game-list');
    const gameElement = document.createElement('h5');
    gameElement.textContent = `${games.name} (${games.manufacturer_name})`;
    gameList.append(gameElement);
    gameElement.addEventListener('click', () => {
        gameDetails(games);
    })

}

function gameDetails(games) {
    currentGame = games;
    gameImg.src = games.image;
    highScore.textContent = games.high_score;
    gameTitle.textContent = games.name;
}

function updateHighScore() {
    const enterHighScore = document.querySelector('#high-score-form');
    enterHighScore.addEventListener('submit', (e) => {
        e.preventDefault();
        
        currentGame.high_score = e.target['score-input'].value;
        gameDetails(currentGame);
        let newHighScore = {
            high_score: currentGame.high_score
        }
        fetch(`http://localhost:3000/games/${currentGame.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newHighScore)
       })
       e.target.reset();
    })   
}
