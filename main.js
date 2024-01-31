class game {
  constructor(square, turn) {
    this.square = square;
    this.turn = turn;
    this.init();
    this.player = 1;
    this.state = [];
  }

  init = () => {
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
          this.state.push({ id: clickedSquare.id, player: this.player });
          // console.log(this.state)
          this.checkVictory(this.player);
          this.player++;
          
        }

        else
        {
          const player2Icon = document.createElement('i');
          player2Icon.classList.add("fas");
          player2Icon.classList.add("fa-circle")
          player2Icon.classList.add('blue');
          clickedSquare.appendChild(player2Icon);
          this.turn.innerHTML = 'Player 1 Turn  <i class="fas fa-times"></i>';
          this.turn.classList.remove('blue')
          this.turn.classList.add('red');
          this.state.push({ id: clickedSquare.id, player: this.player });
          // console.log(this.state)
          this.checkVictory(this.player);
          this.player--;
        }

      });
    });
  }

  checkVictory = (player) => {


    const winningPatterns = [
      // Horizontal Top Row
      [{ id: 1, player: player }, { id: 2, player: player }, { id: 3, player: player }],
      
      // Horizontal Middle Row
      [{ id: 4, player: player }, { id: 5, player: player }, { id: 6, player: player }],
      
      // Horizontal Bottom Row
      [{ id: 7, player: player }, { id: 8, player: player }, { id: 9, player: player }],
      
      // Vertical Left Column
      [{ id: 1, player: player }, { id: 4, player: player }, { id: 7, player: player }],
      
      // Vertical Middle Column
      [{ id: 2, player: player }, { id: 5, player: player }, { id: 8, player: player }],
      
      // Vertical Right Column
      [{ id: 3, player: player }, { id: 6, player: player }, { id: 9, player: player }],
      
      // Diagonal Top Left to Bottom Right
      [{ id: 1, player: player }, { id: 5, player: player }, { id: 9, player: player }],
      
      // Diagonal Top Right to Bottom Left
      [{ id: 3, player: player }, { id: 5, player: player }, { id: 7, player: player }]
    ];

     for(let i = 0; i < winningPatterns.length; i++)
     {
       const winner = winningPatterns[i].every(winningItem =>
         this.state.some(stateItem => 
          stateItem.id === winningItem.id && stateItem.player === winningItem.player))
          
          if (winner) {
            console.log(`Player ${player} wins!`);
            break; 
     }

    }
  }

}

const action = new game(document.querySelectorAll(".square"), document.querySelector('#turn'));