// Calendar - pure REACT version, "my own bike ))"
// skeleton edition

import React, { useState } from "react";
import ReactDOM from "react-dom";
//import CalendarTable from "./calendarMatrix.js";
import {EventList} from "./EventList.js";
import "./index.css";

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
    {/* <CalendarTable /> */}
    <Span />
    <EventList />
    <Span />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
