import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./wining-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard =[
  [null, null, null],
  [null, null, null],
  [null, null, null]
]


function deriveActivePlayer(prevTurns){
  let currentPlayer = 'X'
  console.log(prevTurns);
  
          if(prevTurns.length >0 && prevTurns[0].player === 'X'){
            currentPlayer='O'
          }
  return currentPlayer;
}


function App() {

  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: "Player 2"
  })
  
  //const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array=>[...array])];

for (const turn of gameTurns){

    const { square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col]= player;

}
let winner;

for(const combination of WINNING_COMBINATIONS)
{

/* For Testing Purpose
  console.log('Iteration Got',combination);
  console.log('First Square');
   console.log(combination[0],combination[0].row,combination[0].column);
   console.log('Second Square');
   console.log(combination[1],combination[1].row,combination[1].column);
   console.log('Third Square');
   console.log(combination[2],combination[2].row,combination[2].column);*/

  const firstSquare = gameBoard[combination[0].row][combination[0].column];
  const secondSquare = gameBoard[combination[1].row][combination[1].column];
  const thirdSquare = gameBoard[combination[2].row][combination[2].column];

 if(firstSquare && firstSquare===secondSquare && firstSquare === thirdSquare)
{
  console.log('Winner', firstSquare);

  winner = players[firstSquare];
}

}

const hasDraw = gameTurns.length===9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    //setActivePlayer((currentPlayer)=> currentPlayer === 'X' ? 'O' : 'X')

    
    setGameTurns((prevTurns) =>{
      
      const currentPlayer = deriveActivePlayer(prevTurns);
     
        const updateTurns = [
            {square:{ row:rowIndex, col:colIndex}, player:currentPlayer},...prevTurns
        ];

        return updateTurns;
      }
    )

  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
console.log(symbol, newName)
    setPlayers(prevPlayers=>{
      return {...prevPlayers, 
[symbol] : newName

      }
    })
  }

  return (
    <main>
      <div id="game-container">
<ol id="players" className="highlight-player">
<Player name="Player 1" symbol="X" isActive = {activePlayer === 'X'} onNameChange={handlePlayerNameChange} />
<Player name="Player 2" symbol="O" isActive = {activePlayer === 'O'} onNameChange={handlePlayerNameChange}/>
</ol>
    {(winner || hasDraw) && <GameOver winner={winner}  onRestart={handleRestart}/>}
        {/* {winner && <p> {winner} won!</p>} */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
