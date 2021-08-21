// Calendar - pure REACT version, "my own bike ))"
// skeleton edition

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CalendarTable from "./calendarMatrix.js";
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
  const [someString, setSomeString] = useState("");
  const [todos, setTodos] = useState([]);

  function handleChange(e) {
    setSomeString(e.target.value);
  }

  function addItem() {
    setTodos([...todos, someString]);
    setSomeString("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      let toDo = parceToDo(e.target.value);
      setSomeString(toDo.toString());
      setTodos([...todos, toDo]);
      setSomeString("");
    }
  }

  function parceToDo(draftText) {
    let toDo = {
      date: "31/12",
      day: 31,
      month: 11,
      year: 2021,
      time: "21-15",
      who: "Luke SkyWalker",
      whatWhere: "Party at BlackStarCarnegieHall",
    };

    if(draftText) {
    toDo.date=draftText.match(/(\d\d\/\d\d)|(\d\d\.\d\d)/i);
    toDo.time=draftText.match(/(\d\d\-\d\d)|(\d\d\:\d\d)/i);
//    toDo.who=draftText.match(/\s-(\w)[^\d]{3,}-\s/i);
//    toDo.who=draftText.substr(draftText.indexOf(" - "));

    toDo.day = +toDo.date[0].slice(0,2);
    toDo.month = +toDo.date[0].slice(3,5)-1;
    }
    console.log("time=" + toDo.time[0].toString() + "=");
    console.log("date=" + toDo.date[0].toString() + "= d=" + toDo.day + "= m=" + toDo.month);
    console.log("who=" + toDo.who[0].toString() + "=");
    console.log("whatWhere=" + toDo.whatWhere[0].toString() + "=");
    
    return toDo;
  }

  let defText = "[дата ДД/ММ ][время чч:мм -][ кто -] что,где";

  return (
    <div>
      <p><i>{defText}</i></p>
      <input value={someString} onChange={handleChange} onKeyPress={handleKeyPress} /> &nbsp;
      <button onClick={addItem}>add (+)</button>
      <br />
      <br />
      {todos.map((todo) => (
        <li key={todo.date + todo.time}>
          {todo.date + " " + todo.time + " - " + todo.who + " - " + todo.whatWhere}
        </li>
      ))}
    </div>
  );
}

function Span() {
  return <p> - - - - - </p>;
}

ReactDOM.render(
  <React.StrictMode>
    <div style={{margin:20}}>
    <CalendarHeader />
    <CalendarTable />
    <Span />
    <ToDo />
    <Span />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
