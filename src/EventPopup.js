import { useState } from "react";

// This component edits an event in a popup
export function EventPopup({ isOpen, event, closePopup, updateEvent }) {
  const [oneUpdatedEvent, setOneUpdatedEvent] = useState(event);
  if (!isOpen) return null;

  return (
    <div
      className="flcc"
      style={{
        position: "fixed",
        top: "0px",
        left: "0px",
        backgroundColor: "rgba(200, 200, 200, 0.7)",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        className="vcenter"
        style={{
          position: "absolute",
          backgroundColor: "white",
          width: "300px",
          height: "300px",
          margin: "auto",
        }}
      >
        <div>{JSON.stringify(event)}</div>
        <div>
          <label>
            {" "}
            Header:{" "}
            <input
              value={oneUpdatedEvent.header}
              onChange={(e) => {
                setOneUpdatedEvent({
                  ...oneUpdatedEvent,
                  header: e.target.value,
                });
              }}
            />
          </label>
        </div>
        <button onClick={closePopup}>Cancel</button> &nbsp;
        <button
          onClick={() => {
            updateEvent(oneUpdatedEvent);
            closePopup();
          }}
        >
          {" "}
          OK{" "}
        </button>
      </div>
    </div>
  );
}
