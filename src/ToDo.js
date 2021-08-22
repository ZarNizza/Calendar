import React, { useState } from "react";

function ToDo() {
  const [someString, setSomeString] = useState("");
  const [todos, setTodos] = useState([]);

  function handleChange(e) {
    setSomeString(e.target.value);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      addItem();
    }
  }

  function addItem() {
    let toDo = parseToDo(someString);
    setTodos([...todos, toDo]);
    setSomeString("");
  }

  function parseToDo(draftText) {
    let toDo = {
      day: 31,
      month: 11,
      year: 2021,
      time: " ",
      who: "",
      whatWhere: "BlackStar Party",
    };

    if (draftText) {
      draftText = draftText.trim();
      let date = draftText.match(/(\d*\d\/\d*\d)|(\d*\d\.\d*\d)/i) ? draftText.match(/(\d*\d\/\d*\d)|(\d*\d\.\d*\d)/i)[0] : "";
      toDo.time = draftText.match(/(\d*\d\-\d*\d)|(\d*\d\:\d*\d)/i) ? draftText.match(/(\d*\d\-\d*\d)|(\d*\d\:\d*\d)/i)[0] : "";
      if (date === "") {
        toDo.day = window.aD;
        toDo.month = window.aM + 1;
        toDo.year = window.aY;
      } else {
        toDo.day = +date.slice(0, 2);
        toDo.month = +date.slice(3, 5);
      }

      if ( draftText.indexOf("- ") === -1 || draftText.indexOf("- ") === draftText.lastIndexOf("- ")) {
        //inputString without dash+spaces or with one = whatWhere only
        let trimText = draftText;
        if (date > "") { trimText = trimText.slice(6);}          // date trim
        if (toDo.time > "") { trimText = trimText.slice(6);}     // time trim
        toDo.whatWhere = trimText;
        toDo.who = "";
      } else {
        //inputString with two dash+spaces = who + whatWhere
        toDo.who = draftText.slice(draftText.indexOf("- ") + 2);
        toDo.whatWhere = toDo.who.slice(toDo.who.indexOf("- ") + 2);
        toDo.who = toDo.who.slice(0, toDo.who.indexOf("- ") - 1);
      }

    }

    console.log(toDo);
    return toDo;
  }

  let defText = "[дата ДД/ММ ][время чч:мм ] - кто - что,где";

  return (
    <div>
      <p>
        <i>{defText}</i>
      </p>
      <input
        id="inputString"
        value={someString}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        autoFocus
      />{" "}
      &nbsp;
      <button onClick={addItem}>add (+)</button>
      <br />
      <br />
      {todos.map((todo) => (
        <li key={todo.date + todo.time + todo.who}>
          {todo.day + "/" + todo.month + (todo.time > " " ? ", " : "") + todo.time +
            " = " + todo.who + " = " + todo.whatWhere}
        </li>
      ))}
    </div>
  );
}

export default ToDo;
