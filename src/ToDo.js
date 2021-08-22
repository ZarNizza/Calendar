import React, {useState} from "react";

function ToDo() {
    //localStorage.setItem("activeDate", 14);
 //   console.log("(ToDo) " + localStorage.getItem("activeDate") + "-" + localStorage.getItem("activeMonth") + "-" + localStorage.getItem("activeYear"));
  
    const [someString, setSomeString] = useState("");
    const [todos, setTodos] = useState([]);
  
    function handleChange(e) {
      setSomeString(e.target.value);
    }
  
    function addItem() {
 //     console.log("(add) " + localStorage.getItem("activeDate") + "-" + localStorage.getItem("activeMonth") + "-" + localStorage.getItem("activeYear"));
      let toDo = parseToDo(someString);
      setTodos([...todos, toDo]);
      setSomeString("");
    }
  
    function handleKeyPress(e) {
      if (e.key === "Enter") {
 //       console.log("(Enter) " + localStorage.getItem("activeDate") + "-" + localStorage.getItem("activeMonth") + "-" + localStorage.getItem("activeYear"));
        let toDo = parseToDo(e.target.value);
        setSomeString(toDo.toString());
        setTodos([...todos, toDo]);
        setSomeString("");
      }
    }
  
    function parseToDo(draftText) {
 //     console.log("---Draft = " + draftText);
 //     console.log("(parse) " + localStorage.getItem("activeDate") + "-" + localStorage.getItem("activeMonth") + "-" + localStorage.getItem("activeYear"));
  
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
      console.log("yesDraft");
      toDo.date = (draftText.match(/(\d\d\/\d\d)|(\d\d\.\d\d)/i)) ? draftText.match(/(\d\d\/\d\d)|(\d\d\.\d\d)/i)[0] : "";
      toDo.time = (draftText.match(/(\d\d\-\d\d)|(\d\d\:\d\d)/i)) ? draftText.match(/(\d\d\-\d\d)|(\d\d\:\d\d)/i)[0] : [" "];
      toDo.who=draftText.slice(draftText.indexOf("- ") + 2);
      toDo.whatWhere=toDo.who.slice(toDo.who.indexOf("- ") + 2);
      toDo.who=toDo.who.slice(0, toDo.who.indexOf("- ") - 1);
      if (toDo.date === '') {
        toDo.day = window.aD; 
        toDo.month = window.aM + 1;
        toDo.year = window.aY;
   //     toDo.day = localStorage.getItem("activeDate"); 
   //     toDo.month = localStorage.getItem("activeMonth");
      } else {
        toDo.day = +toDo.date.slice(0,2);
        toDo.month = +toDo.date.slice(3,5);
      } 
 //     console.log("(yesParsed) " + localStorage.getItem("activeDate") + "-" + localStorage.getItem("activeMonth") + "-" + localStorage.getItem("activeYear"));
  
      }
  
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
          <li key={todo.date + todo.time + todo.who}>
            {todo.day + "/" + todo.month + " " + todo.time + " - " + todo.who + " - " + todo.whatWhere}
          </li>
        ))}
      </div>
    );
  }

  export default ToDo;