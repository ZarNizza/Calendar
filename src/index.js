// Calendar - pure REACT version, "my own bike ))"
// skeleton edition

import React, { useState } from "react";
import ReactDOM from "react-dom";
import CalendarTable from "./calendarMatrix.js";
import ToDo from "./ToDo.js";
import "./index.css";

//console.log("(1) " + localStorage.getItem("activeDate") + "-" + localStorage.getItem("activeMonth") + "-" + localStorage.getItem("activeYear"));

if(typeof localStorage.getItem("activeDate") === 'undefined' ) {localStorage.setItem("activeDate", new Date().getDate()); alert("! aD = UnDef !")}
if(typeof localStorage.getItem("activeMonth") === 'undefined') {localStorage.setItem("activeMonth", new Date().getMonth());}
if(typeof localStorage.getItem("activeYear") === 'undefined') {localStorage.setItem("activeYear", new Date().getFullYear());}

//console.log("(2) " + localStorage.getItem("activeDate") + "-" + localStorage.getItem("activeMonth") + "-" + localStorage.getItem("activeYear"));

function CalendarHeader() {
  return (
    <div>
      <h2>Calendar</h2>
      <p>pure REACT version, skeleton edition</p>
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
