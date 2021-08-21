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
    let toDo = parseToDo(someString);
    setTodos([...todos, toDo]);
    setSomeString("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      let toDo = parseToDo(e.target.value);
      setSomeString(toDo.toString());
      setTodos([...todos, toDo]);
      setSomeString("");
    }
  }

  function parseToDo(draftText) {
    let toDo = {
      date: "01/03",
      day: 31,
      month: 11,
      year: 2021,
      time: "21-15",
      who: "Luke SkyWalker",
      whatWhere: "Party at BlackStarCarnegieHall",
    };

    if(draftText) {
    toDo.date = (draftText.match(/(\d\d\/\d\d)|(\d\d\.\d\d)/i)) ? draftText.match(/(\d\d\/\d\d)|(\d\d\.\d\d)/i)[0] : ["01/00"];
    toDo.time = (draftText.match(/(\d\d\-\d\d)|(\d\d\:\d\d)/i)) ? draftText.match(/(\d\d\-\d\d)|(\d\d\:\d\d)/i)[0] : ["10:00"];
    toDo.who=draftText.slice(draftText.indexOf("- ") + 2);
    toDo.whatWhere=toDo.who.slice(toDo.who.indexOf("- ") + 2);
    toDo.who=toDo.who.slice(0, toDo.who.indexOf("- ") - 1);

    toDo.day = +toDo.date.slice(0,2);
    toDo.month = +toDo.date.slice(3,5)-1;
    }
/*     console.log("time=" + toDo.time[0].toString() + "=");
    console.log("date=" + toDo.date[0].toString() + "= d=" + toDo.day + "= m=" + toDo.month + "=");
    console.log("who=" + toDo.who + "=");
    console.log("whatWhere=" + toDo.whatWhere + "=");
 */    
    return toDo;
  }

  let defText = "[дата ДД/ММ ][время чч:мм ] [- кто -] что,где";

  return (
    <div>
      <p><i>{defText}</i></p>
      <input value={someString} onChange={handleChange} onKeyPress={handleKeyPress} /> &nbsp;
      <button onClick={addItem}>add (+)</button>
      <br />
      <br />
      {todos.map((todo) => (
        <li key={todo.date + todo.time}>
          {todo.day + "/" + todo.month + " " + todo.time + " - " + todo.who + " - " + todo.whatWhere}
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
