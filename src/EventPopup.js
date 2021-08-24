import { useState } from "react";
import { FlexBgDiv, FlexPopupDiv, SoloDiv } from "./styled-components/Center";

// This component edits an event in a popup
export function EventPopup({ isOpen, event, closePopup, updateEvent }) {
const [singleUpdatedEvent, setSingleUpdatedEvent] = useState(event);
const [errors, setErrors] = useState([]);

  if (!isOpen) return null;

  function validate() {
    if (singleUpdatedEvent.header.length < 3) {
      setErrors(["header is too short"]);
      return false;
    }
    if (singleUpdatedEvent.who.match(/[^\d\w\sа-я,.!;]/i)) {
      setErrors(["! members list has wrong symbols"]);
      return false;
    }
    if (singleUpdatedEvent.description.match(/[^\d\w\sа-я,.!;]/i)) {
      setErrors(["! description text has wrong symbols"]);
      return false;
    }
    setErrors([]);
    return true;
  }

  return (
    <FlexBgDiv>
      <FlexPopupDiv>
        <div>{JSON.stringify(event)}</div>
{/* input area */}
        <SoloDiv>
          <label>
            {" "}
            Header:{" "}
            <input
              id="inputHeader"
              value={singleUpdatedEvent.header}
              onChange={(e) => {
                setSingleUpdatedEvent({
                  ...singleUpdatedEvent,
                  header: e.target.value,
                });
                if (e.target.value.length < 3) {
                  setErrors(["! header is too short"]);
                } else {
                  setErrors([]);
                }
              }}
              style={{width:"250px"}}/>
          </label>
        </SoloDiv>
        <SoloDiv>
          <label>
            {" "}
            Members:{" "}
            <input
              id="inputWho"
              value={singleUpdatedEvent.who}
              onChange={(e) => {
                setSingleUpdatedEvent({
                  ...singleUpdatedEvent,
                  who: e.target.value,
                });
                if (e.target.value.match(/[^\d\w\sа-я,.!;]/i)) {
                  setErrors(["! members list has wrong symbols"]);
                } else {
                  setErrors([]);
                }
              }}
            style={{width:"250px"}} />
          </label>
        </SoloDiv>
        <SoloDiv>
          <label>
            {" "}
            Description:{" "}
            <input
              id="inputDescription"
              value={singleUpdatedEvent.description}
              onChange={(e) => {
                setSingleUpdatedEvent({
                  ...singleUpdatedEvent,
                  description: e.target.value,
                });
                if (e.target.value.match(/[^\d\w\sа-я,.!;]/i)) {
                  setErrors(["! description text has wrong symbols"]);
                } else {
                  setErrors([]);
                }
              }}
            style={{width:"250px"}} />
          </label>
        </SoloDiv>

{/* buttons string */}
        <div style={{ textAlign: "right" }}>
          <button onClick={closePopup}>Cancel</button> &nbsp;
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                updateEvent(singleUpdatedEvent);
                closePopup();
              }
            }}
          >
            {" "}
            OK{" "}
          </button>
        </div>
{/* error string */}
        {errors.length === 0 ? null : errors.map((error) => <div key={error} style={{color:"red"}}>{error}</div>)}
      </FlexPopupDiv>
    </FlexBgDiv>
  );
}
