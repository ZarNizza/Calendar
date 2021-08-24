import { useState } from "react";

// This component edits an event in a popup
export function EventPopup({ isOpen, event, closePopup, updateEvent }) {
  const [oneUpdatedEvent, setOneUpdatedEvent] = useState(event);
  const [errors, setErrors] = useState([]);
  if (!isOpen) return null;

  function validate() {
    console.log("oneUpdatedEvent.header", oneUpdatedEvent.header);
    if (oneUpdatedEvent.header.length < 3) {
      setErrors(["header is too short"]);
      return false;
    }
    setErrors([]);
    return true;
  }

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
        {errors.length === 0
          ? null
          : errors.map((error) => <div key={error}>{error}</div>)}
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
                console.log("e.target.value", e.target.value);

                if (e.target.value.length < 3) {
                  setErrors(["header is too short"]);
                } else {
                  setErrors([]);
                }
              }}
            />
          </label>
        </div>
        <button onClick={closePopup}>Cancel</button> &nbsp;
        <button
          onClick={() => {
            const isValid = validate();
            if (isValid) {
              updateEvent(oneUpdatedEvent);
              closePopup();
            }
          }}
        >
          {" "}
          OK{" "}
        </button>
      </div>
    </div>
  );
}
