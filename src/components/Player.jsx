import { useState } from "react";

export default function Player ({initialName, symbol, isActive, onChangeName}) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);
  
  const handleIsEditing = () => {
    setIsEditing((prevState) => !prevState);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  };
  
  function handleChange(event) {
    setPlayerName(event.target.value);
  };
  
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  
  if (isEditing) {
    editablePlayerName = <input onChange={handleChange} type="text" value={playerName} required />;
  }
  
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleIsEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};