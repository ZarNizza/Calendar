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
  const [someString, setSomeString] = useState('')
  const [todos, setTodos] = useState([])
  function handleChange(e) {
    setSomeString(e.target.value)
  }
  function addItem() {
    setTodos([...todos, someString])
    setSomeString('')
  }
  return <div>
     <input value={someString} onChange={handleChange} /><button onClick={addItem}>add</button>
     <Display mySomething={someString} />
     {todos.map(todo => <li>{todo}</li>)}
  </div>
}

function Display(props) {
  const [foo, setFoo] = useState("false")
  useEffect(() => {
    setTimeout(() => setFoo("true"), 1000)
  }, [  ])
  return <p>some string is {props.mySomething}, foo is {foo}</p>
}

function InputLine() {
  return (
    <div>
      <p>
        New ToDo: <input autoFocus type="text" />
        <button id="addButton">Add (+)</button>
      </p>
    </div>
  );
}

function ListBlock() {
  return (
    <div>
      <p>* ToDoList *</p>
      <ol>
        <li> Aaaa.</li>
        <li> Bbbb.</li>
        <li> Cccc.</li>
      </ol>
    </div>
  );
}

function Span() {
  return <p> - - - - - </p>;
}

ReactDOM.render(
  <React.StrictMode>
    <ToDo />
    <CalendarHeader />
    <CalendarTable />
    <Span />
    <InputLine />
    <Span />
    <ListBlock />
  </React.StrictMode>,
  document.getElementById("root")
);
