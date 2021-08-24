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
    setEvents((events) => [...events, eventItem]);
    setDraftItem("");
  }

  function deleteItem(eventToDelete) {
    const updatedEvents = events.filter(
      (eventItem) => eventItem !== eventToDelete
    );
    setEvents(updatedEvents);
  }

  function handleUpdateEvent(updatedEvent) {
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
  }

  const defText = '[дата ДД/ММ ][время чч:мм ]["название" ][- кто ]- что, где';
  const testText = '25/08 08-15 "Подвиг" - Барон М. - Завтрак, разогнать тучи, подвиг';

  return (
    <div>
      <p>
        <i>{defText}</i>
      </p>
      <p style={{color:"lightgray"}}>{testText}</p>
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
      {events.map((eventItem) => (
        <EventItem
          key={eventItem.id}
          eventItem={eventItem}
          setEventToEdit={setEventToEdit}
          deleteItem={deleteItem}
        />
      ))}
      {eventToEdit !== null ? (
        <EventPopup
          isOpen={eventToEdit.id !== null}
          event={eventToEdit}
          closePopup={() => setEventToEdit(null)}
          updateEvent={handleUpdateEvent}
        />
      ) : null}
    </div>
  );
}
