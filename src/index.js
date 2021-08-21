// Calendar - pure REACT version, "my own bike ))"
// skeleton edition

import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import CalendarTable from "./calendarMatrix.js"
import "./index.css";


function CalendarHeader() {
  return (
    <div>
      <h2>Calendar</h2>
      <p>pure REACT version, skeleton edition</p>
    </div>
  );
}

function ToDo() {
  const [someString, setSomeString] = useState('');
  const [todos, setTodos] = useState([]);

  function handleChange(e) {
    setSomeString(e.target.value)
  }

  function addItem() {
    setTodos([...todos, someString]);
    setSomeString('')
  }

  function handleKeyPress(e) {
    if(e.key === 'Enter'){
    setSomeString(e.target.value);
    setTodos([...todos, someString]);
    setSomeString('')
    } 
  }

  let defText = "[дата ДД/ММ ][время чч:мм -][ кто -] что,где";

  return <div>
    <p>{defText}</p>
     <input value={someString} onChange={handleChange} onKeyPress={handleKeyPress} /> <button onClick={addItem}>add (+)</button>
      {todos.map(todo => <li key={todo.toString().slice(0,11)}>{todo}</li>)}
  </div>
}


function Span() {
  return <p> - - - - - </p>;
}

ReactDOM.render(
  <React.StrictMode>
    <CalendarHeader />
    <CalendarTable />
    <Span />
    <ToDo />
    <Span />
  </React.StrictMode>,
  document.getElementById("root")
);
