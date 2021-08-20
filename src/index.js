
// Calendar - pure REACT version, "my own bike ))"
// skeleton edition

import { months } from "moment";
import React, { Component } from "react";
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

function CalendarTable() {
  let state = { activeDate: new Date() }
  let monthsString = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  let weekDaysShort = [ "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс" ];
  let month = "Август";
  let year = "2021";

  return (
    <div>
      <table>
        <caption>Август 2021</caption>
        <tr><td>Пн Вт Ср Чт Пт Сб Вс</td></tr>
        <tr><td>.1 .2 .3 .4 .5 .6 .7</td></tr>
        <tr><td>.8 .9 10 11 12 13 14</td></tr>
        <tr><td>15 16 17 18 19 20 21</td></tr>
        <tr><td>22 23 24 25 26 27 28</td></tr>
        <tr><td>29 30 31</td></tr>
      </table>
    </div>
  );
}

function InputLine() {
  return (
    <div>
    <p>
    New ToDo
    <input autofocus type="text" />
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
