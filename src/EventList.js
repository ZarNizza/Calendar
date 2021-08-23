import React, { useState } from "react";
import { parseEvent } from "./parseEvent.js";
import { EventItem } from "./EventItem.js";
import {EventPopup} from "./EventPopup.js";

export function EventList() {
  const [draftText, setDraftText] = useState("");
  // arr Events [{id: Math.random(), timeStamp:"", header:"", who:"", description:""}]
  const [events, setEvents] = useState([]);
  // eventToEdit = null OR event
  const [eventToEdit, setEventToEdit] = useState(null);

  function handleChange(e) {
    setDraftText(e.target.value);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      addItem();
    }
  }

  function addItem() {
    let event = parseEvent(draftText);
    setEvents([...events, event]);
    setDraftText("");
  }

  function deleteItem(eventToDelete) {
    const updatedEvents = events.filter((event) => event !== eventToDelete);
    setEvents(updatedEvents);
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
        value={draftText}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        style={{ width: 330 }}
      />{" "}
      &nbsp;
      <button onClick={addItem}>add (+)</button>
      <br />
      <br />
      {events.map(event => <EventItem key={event.id} event={event} eventToEdit={setEventToEdit} deleteItem={deleteItem} />)}
      <EventPopup isOpen={index !== null} event={eventToEdit} />
    </div>
  );
}

