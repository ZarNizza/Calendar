import React, { useState } from "react";

function ToDo() {
  const [someString, setSomeString] = useState("");
  const [todos, setTodos] = useState([]);
  const toDoList = document.getElementById("toDoList");

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
    //setTodos([...todos, toDo]);   // lag 1 step
    //setTodos([todos.splice(todos.length+1,0,toDo)]); // Array [ [], {…} ]
    //setTodos([todos.push([toDo])]); // Array [ 1, (1) […] ]
    //setTodos([todos.push(toDo)]); // last only - Array [ 1, {…} ]
    setTodos([...todos, toDo]);     // lag 1 step: Array []  // Array [ {…} ] // Array [ {…}, {…} ]
    setSomeString("");

 /*        toDos.push(ToDo);
        const toDoList = document.getElementById("toDoList");
        toDoList.innerHTML = toDos
          .map(
            (toDo, index) =>
              `<p><input id="chk${index.toString()}" type="checkbox"> - <span id="sp${index.toString()}" style="text-decoration:none;">${toDo}</span></p>`
          )
          .join("");
 */    console.log("add ");
    console.log(todos);
  }

  function delItem(e) {
    //todos.splice(e.target.id, 1);
    setTodos([todos.splice(+e.target.id.slice(1), 1)]);
    console.log("del ");
    console.log(todos);
  }

  function editItem(e){
    let todo = todos[e.target.id];
    let a = "<p style='width:100%; text-align:right;'><span style='display:inline-block; width:350px; text-align:center;'>- Edit -</span><button id='exitButton' >exit</button></p>" +
    "<p> </p>" +
    "<input id='edInputString' style='width:350px;' value='" + 
    todo.day + "/" + todo.month + (todo.time > " " ? ", " : "") + todo.time +
    " - " + todo.who + " - " + todo.whatWhere + 
    "' />  " +
    "<button id='saveButton'" + e.target.id + " >save</button>";
    const editArea = document.getElementById("editArea");
    editArea.innerHTML = '<div style="display: inline-block; min-width: 25em; min-height: 21em; background: #eee; position: absolute; z-index: 5;">' + a + '</div>';
    
    const saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", (event) => {
        const newToDo = parseToDo(document.getElementById("edInputString").value);
        //todos[e.target.id] = newToDo;
        setTodos([todos[e.target.id] = newToDo]);
    
        editArea.innerHTML = '';
        console.log("edit ");
        console.log(todos);
    });

    const exitButton = document.getElementById("exitButton");
    exitButton.addEventListener("click", (event) => {
        editArea.innerHTML = '';
    });
    
    return;
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
      draftText = draftText.replace(/\s{1,}/g," ").trim();   // remove multiple spaces
      let date = draftText.match(/(\d*\d\/\d*\d)|(\d*\d\.\d*\d)/i) ? draftText.match(/(\d*\d\/\d*\d)|(\d*\d\.\d*\d)/i)[0] : "";
      toDo.time = draftText.match(/(\d*\d\-\d*\d)|(\d*\d\:\d*\d)/i) ? draftText.match(/(\d*\d\-\d*\d)|(\d*\d\:\d*\d)/i)[0] : "";
      if (date === "") {
        toDo.day = window.aD;
        toDo.month = window.aM + 1;
        toDo.year = window.aY;
      } else {
        let dashPos = date.indexOf("/");
        if (dashPos === -1) {dashPos = date.indexOf(".")}
        toDo.day = +date.slice(0, dashPos);
        toDo.month = +date.slice(dashPos + 1);
      }

      if ( draftText.indexOf("- ") === -1 || draftText.indexOf("- ") === draftText.lastIndexOf("- ")) {
        //inputString without dash+spaces or with one = whatWhere only
        let trimText = draftText;
        if (date > "") { trimText = trimText.slice(date.length + 1);}          // date trim
        if (toDo.time > "") { trimText = trimText.slice(toDo.time.length + 1);}     // time trim
        toDo.whatWhere = trimText;
        toDo.who = "";
      } else {
        //inputString with two dash+spaces = who + whatWhere
        toDo.who = draftText.slice(draftText.indexOf("- ") + 2);
        toDo.whatWhere = toDo.who.slice(toDo.who.indexOf("- ") + 2);
        toDo.who = toDo.who.slice(0, toDo.who.indexOf("- ") - 1);
      }

    }

    //console.log('-ToDo-');
    //console.log(toDo);
    return toDo;
  }

  let defText = "[дата ДД/ММ ][время чч:мм ] - кто - что, где";

  return (
    <div>
      <p>
        <i>{defText}</i>
      </p>
      <input
        type="text"
        id="inputString"
        autoFocus
        value={someString}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        style={{width:330}}
      />{" "}
      &nbsp;
      <button onClick={addItem}>add (+)</button>
      <br />
      <br />
      {todos.map((todo, index) => (
          <li key={index} >
          {todo.day + "/" + todo.month + (todo.time > " " ? ", " : "") + todo.time +
            " - " + todo.who + " - " + todo.whatWhere} <button id={index} onClick={editItem} >edit</button> &nbsp;
             <button id={'d'+index} onClick={delItem} >del(X)</button>
        </li>
      ))}
    </div>
  );
}

export default ToDo;
