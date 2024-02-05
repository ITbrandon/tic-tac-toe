class game {
  constructor(square, turn, overlay, modal, victory, button) {
    this.square = square;
    this.turn = turn;
    this.overlay = overlay;
    this.modal = modal;
    this.victory = victory;
    this.button = button;
    this.play();
    this.init();
    this.player = 1;
    this.player1array = [];
    this.player2array = [];
    this.winningPatterns = [
      [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]             
    ];
    this.counter = 0;

  }

  init = () => {
    this.button.addEventListener('click', this.playAgain);
  }

  play = () => {

    this.square.forEach(square => {
      
      square.addEventListener('click', (event) => {
      
      let clickedSquare = event.target;

      if (square.querySelector('.fas')) {
        return;
      }


        if(this.player == 1)
        {
          const player1Icon = document.createElement('i');
          player1Icon.classList.add("fas");
          player1Icon.classList.add('fa-times');
          player1Icon.classList.add('red');
          clickedSquare.appendChild(player1Icon);
          this.turn.innerHTML = 'Player 2 Turn  <i class="fas fa-circle"></i>';
          this.turn.classList.remove('red')
          this.turn.classList.add('blue');
          this.player1array.push(Number(clickedSquare.id));
          this.checkVictory(this.player1array, this.player);
          this.counter++;
          this.player++;
          
        }

        else
        {
          const player2Icon = document.createElement('i');
          player2Icon.classList.add("fas");
          player2Icon.classList.add("fa-circle");
          player2Icon.classList.add('blue');
          clickedSquare.appendChild(player2Icon);
          this.turn.innerHTML = 'Player 1 Turn  <i class="fas fa-times"></i>';
          this.turn.classList.remove('blue');
          this.turn.classList.add('red');
          this.player2array.push(Number(clickedSquare.id));     
          this.checkVictory(this.player2array, this.player);
          this.counter++;
          this.player--;
          
        }

        if(this.counter === 9)
        {
          this.draw();
        }

      });
    });
  }

  checkVictory = (playerArray, player) => {

    for (let i = 0; i < this.winningPatterns.length; i++)
    {
      const currentPattern = this.winningPatterns[i];
      const isWinner = currentPattern.every(element => playerArray.includes(element));
  
      if (isWinner)
      {
        this.counter--;
        this.winGame(player);
      }

    }
  }

  winGame = (player) => {
    this.modal.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
    this.turn.innerHTML = "Game Over";
    this.turn.classList.add('black');

    if(player === 1)
    {
      this.victory.textContent = "Congratulations Player 1 You Win";
      this.button.style.backgroundColor = "red";
    }
    else
    {
      this.victory.textContent = "Congratulations Player 2 You Win";
      this.button.style.backgroundColor = "blue";
    }
  }

  draw = () => {
    this.modal.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
    this.turn.innerHTML = "Game Over";
    this.turn.classList.add('black');
    this.victory.textContent = "Draw";
    this.button.style.backgroundColor = "gray";
  }

  playAgain = () => {
    this.square.forEach(square => {
      square.innerHTML = '';
    })

    this.overlay.classList.add('hidden')
    this.modal.classList.add('hidden')
    this.turn.innerHTML = 'Player 1 Turn  <i class="fas fa-times"></i>';
    this.turn.classList.add('red');
    this.turn.classList.remove('blue');
    this.turn.classList.remove('black');
    this.player = 1;
    this.player1array = [];
    this.player2array = [];
    this.counter = 0;
  }


}

const action = new game(document.querySelectorAll(".square"), document.querySelector('#turn'), document.querySelector('#overlay'), document.querySelector('#modal'), document.querySelector('#victory'), document.querySelector('#button'));