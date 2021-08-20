
// Calendar - pure REACT version, "my own bike ))"
// skeleton edition

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";


function CalendarHeader() {
  return (
    <div>
    <h2>Calendar</h2>
    <p>pure REACT version, skeleton edition</p>
    </div>
  );
}

let state = { activeDate: new Date() }

function generateMatrix() {
  let monthsString = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  let weekDaysShort = [ "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс" ];
  
let year = state.activeDate.getFullYear();
let month = state.activeDate.getMonth();
let firstDay = new Date(year, month, 1).getDay();
let daysInMonth = () => { // magic formula! ))
  if (isNaN(year) || isNaN(month)) {
    return NaN;
  };
  let modMonth = month % 12;
  year += (month - modMonth) / 12;
  return modMonth === 1
    ? (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
      ? 29
      : 28
    : 31 - ((modMonth % 7) % 2);
};
//console.log(year, " - ", month, ", 1stDay: ", firstDay, ", daysInMonth: ", daysInMonth());

let matrix = [];
matrix[0] = weekDaysShort;

let counter = 1;
for (var row = 1; row < 7; row++) {
  matrix[row] = [];
  for (var col = 0; col < 7; col++) {
    matrix[row][col] = "--";
    if (row == 1 && col >= firstDay) {
      // Fill in rows only after the first day of the month
      matrix[row][col] = counter++;
    } else if (row > 1 && counter <= daysInMonth()) {
      // Fill in rows only if the counter’s not greater than the number of days in the month
      matrix[row][col] = counter++;
    }
  }
}
return matrix;

}

function CalendarTable() {
  
  let matrix = generateMatrix();
  console.log(matrix);

  return (
    <div>
      <table>
        <caption>Август 2021</caption>
        <thead>
        <tr><td>Пн Вт Ср Чт Пт Сб Вс</td></tr>
        </thead>
        <tbody>
        <tr><td>.1 .2 .3 .4 .5 .6 .7</td></tr>
        <tr><td>.8 .9 10 11 12 13 14</td></tr>
        <tr><td>15 16 17 18 19 20 21</td></tr>
        <tr><td>22 23 24 25 26 27 28</td></tr>
        <tr><td>29 30 31</td></tr>
        </tbody>
      </table>
    </div>
  );
}

function InputLine() {
  return (
    <div>
    <p>New ToDo: <input autoFocus type="text" />
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
  return (
    <p> - - - - - </p>
  );
}




ReactDOM.render(
  <React.StrictMode>
    <CalendarHeader />
    <CalendarTable />
    <Span />
    <InputLine />
    <Span />
    <ListBlock />
  </React.StrictMode>,
  document.getElementById("root")
);
