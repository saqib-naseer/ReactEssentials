import React from 'react'
import { useState } from 'react'

function Player({name, symbol, isActive, onNameChange}) {

const [isEditing, setIsEditing] = useState(false);
const [playerName, setPlayerName] = useState(name);

function handleChange(event){
    console.log(event.target.value)
    setPlayerName(event.target.value)
}

function HandleEditClick(){
  setIsEditing(editing => !editing);
  if(isEditing) onNameChange(symbol,playerName);
}

console.log('Player Component Loaded with', name, symbol)

  return (
    <li className={isActive ? 'active' : undefined}>
        <span className='player'>
{!isEditing ? <span className="player-name"> {playerName}</span>

: <input type='text' required value={playerName} onChange={handleChange}></input>}
       
        <span className="player-symbol"> {symbol}</span>


        </span>

        <button onClick={HandleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  )
}

export default Player