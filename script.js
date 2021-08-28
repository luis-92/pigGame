'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting Conditions
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const reset = function () {
  //Reset to starting Conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //starting conditions DOM
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

reset();

const switchPlayer = function () {
  //Switch no next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Reset variable to 0 to start again with next player
  currentScore = 0;
  //display in dom current score reseted and match this with currentSocore variable mentioned before.
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generate randome dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    //2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for the rolled 1: if true
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to score of active player'
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score >= 100
    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. If score not >= 100, switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', reset);
