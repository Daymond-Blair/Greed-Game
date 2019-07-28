var scores, roundScore, activePlayer, gamePlaying, victoryScore, previousRoll;

n startGame();

//dice = Math.floor(Math.random() * 6 + 1);
//console.log(dice);
//document.querySelector('current-0').textContent = dice;
//document.querySelector('current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent;
//console.log(x);

// hide dice display


// add event listener to btn-roll class
document.querySelector('.btn-roll').addEventListener('click', function () {
    //do stuff with annonymous no name function
    if (gamePlaying) {


        // random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // display result
        // store query selection
        var diceDOM = document.querySelector('.dice');
        //bring style back to block to reveal the hidden dice
        diceDOM.style.display = 'block';
        // set the stored query selection to concatenated string value, between 6 dice pictures
        diceDOM.src = 'dice-' + dice + '.png';

        // remove player score if 6 is rolled consecutively
        if (dice === 6 && previousRoll === 6) {
            // set player score back to zero
            scores[activePlayer] = 0;
            // update DOM
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else if (dice !== 1) {
            // update the round score if the rolled number was not a 1
            roundScore += dice;
            currentRoll = dice;

            // display updated round score
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {

            // end round and start over from zero
            nextPlayer();

        }
        previousRoll = dice;
        //document.querySelector('.player-0-panel').classList.add('active');
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore;

        // update ui to show the current score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var winScore = document.querySelector('#winScore').value;
        // check if player won the game by reaching 100 or more
        if (scores[activePlayer] >= winScore) {
            // add win notification to winner's side
            document.querySelector('#name-' + activePlayer).textContent = 'You Won!';
            // remove dice picture
            document.querySelector('.dice').style.display = 'none';
            // update winner's side
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            // make loser's side inactive
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            // document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');
            // document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');

            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', startGame);

function nextPlayer() {
    // if active player is 0, set it to 1 otherwise set it to 0
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // reset round score
    roundScore = 0;


    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

function startGame() {
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    //victoryScore = prompt("What are you playing to?");

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // reset player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    // reset active player styling
    document.getElementById('name-0').textContent = 'Player 1';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');


}

function endGame() {
    document.querySelector('#name-' + activePlayer).textContent = "You win!";
    //alert("Game over, player " + activePlayer + " wins!");
}

/*
challenges
1. player loses entire score when rolling two 6 in a row
2. add input field which accepts winning score.
3. add second dice to the game */
