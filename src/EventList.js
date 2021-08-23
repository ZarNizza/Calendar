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
    let eventItem = parseEvent(draftItem);
    console.log("addItem");
    console.log(eventItem);
    setEvents([...events, eventItem]);
    setDraftItem("");
    console.log(events);
  }

  function deleteItem(eventToDelete) {
    const updatedEvents = events.filter((eventItem) => eventItem !== eventToDelete);
    setEvents(updatedEvents);
  }

  let defText = '[дата ДД/ММ ][время чч:мм ]["название" ][- кто ]- что, где';



  return (
    <div>
      <p>
        <i>{defText}</i>
      </p>
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
      {events.map(eventItem => <EventItem key={eventItem.id} event={eventItem} eventToEdit={setEventToEdit} deleteItem={deleteItem} />)}
      {/* <EventPopup isOpen={eventToEdit.id !== null} event={eventToEdit} /> */}
    </div>
  );
}

