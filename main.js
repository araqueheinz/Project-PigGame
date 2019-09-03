document.addEventListener('DOMContentLoaded', () => {
  let scores, roundScore, activePlayer, gamePlaying;

  let lastDice;

  init();

  /* /////////////////////////////////////////////////////////////////////// */
  /* /                        Functions                                    / */
  /* /////////////////////////////////////////////////////////////////////// */

  function init(){

    scores =[0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

  };

  function nextPLayer(){

    //next player
    activePlayer === 0 ? activePlayer = 1 :  activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

  };

  /* /////////////////////////////////////////////////////////////////////// */
  /* /                        Roll Dice btn                                / */
  /* /////////////////////////////////////////////////////////////////////// */

  document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){

      //1. We need a random number
      let dice1 = Math.floor(Math.random() *6) + 1;
      let dice2 = Math.floor(Math.random() *6) + 1;

      //2. We need to display the result
      document.getElementById('dice-1').style.display = 'block';
      document.getElementById('dice-2').style.display = 'block';
      document.getElementById('dice-1').src = './img/dice-'+ dice1 +'.png'
      document.getElementById('dice-2').src = './img/dice-'+ dice2 +'.png'

      if(dice1 !== 1 && dice2 !== 1){
        //Add score
        roundScore += dice1 + dice2;
        document.querySelector('#current-'+activePlayer).textContent = roundScore;
      } else {
          nextPLayer();
        }
    }
  });

  /* /////////////////////////////////////////////////////////////////////// */
  /* /                              Hold btn                               / */
  /* /////////////////////////////////////////////////////////////////////// */

  document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){

    scores[activePlayer] += roundScore;
    //update the user interface
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      var input = document.querySelector('.final-score').value; //if Undefined, 0, null or "" are coerced to false
      var winningScore;

      if(input === true && (isNaN(input))){
        winningScore = input;
      }
      else{
        winningScore = 100;
      }


    //check if player won the game.
    //Ternary Operator: it is kind of a if statement but it is easier to write it.
    if(scores[activePlayer] >= winningScore){
      document.querySelector('#name-'+activePlayer).textContent = 'Winner!'
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    }
    else{
      //Next players
      nextPLayer();
    }
  }
  });

  /* /////////////////////////////////////////////////////////////////////// */
  /* /                             New Game btn                            / */
  /* /////////////////////////////////////////////////////////////////////// */

  document.querySelector('.btn-new').addEventListener('click', init);

});