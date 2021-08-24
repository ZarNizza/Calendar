import React, { useState } from "react";
import { parseEvent } from "./parseEvent.js";
import { EventItem } from "./EventItem.js";
import { EventPopup } from "./EventPopup.js";

export function EventList() {
  const [draftItem, setDraftItem] = useState("");
  // arr Events [{id: Math.random(), timeStamp:"", header:"", who:"", description:""}]
  const [events, setEvents] = useState([]);
  // eventToEdit = null OR event
  const [eventToEdit, setEventToEdit] = useState(null);

  function handleChange(e) {
    setDraftItem(e.target.value);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      addItem();
    }
  }

  function addItem() {
    const eventItem = parseEvent(draftItem);
    console.log("addItem");
    console.log(eventItem);
    setEvents(events => ([...events, eventItem]) );
    setDraftItem("");
    console.log(events);
  }

  function deleteItem(eventToDelete) {
    const updatedEvents = events.filter((eventItem) => eventItem !== eventToDelete);
    setEvents(updatedEvents);
  }

  const defText = '[дата ДД/ММ ][время чч:мм ]["название" ][- кто ]- что, где';
  const testText = '12/12 15-15 "aaa" - bbb - ccc';



  return (
    <div>
      <p>
        <i>{defText}</i>
      </p>
      <p>{testText}</p>
      <input
        type="text"
        id="inputString"
        autoFocus
        value={draftItem}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        style={{ width: 330 }}
      />{" "}
      &nbsp;
      <button onClick={addItem}>add (+)</button>
      <br />
      <br />
      {events.map(eventItem => <EventItem key={eventItem.id} eventItem={eventItem} eventToEdit={setEventToEdit} deleteItem={deleteItem} />)}
      {(eventToEdit !== null) ? <EventPopup isOpen={eventToEdit.id !== null} event={eventToEdit} /> : ""}
    </div>
  );
}

