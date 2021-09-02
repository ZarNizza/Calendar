import { useState } from "react";
import { FlexBgDiv, FlexPopupDiv, SoloDiv } from "./styled-components/Center";

// This component edits an event in a popup
export function EventPopup({ isOpen, event, closePopup, updateEvent }) {
  const [singleUpdatedEvent, setSingleUpdatedEvent] = useState(event);
  const [errors, setErrors] = useState([]);
  const formatter = new Intl.DateTimeFormat("ru", {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const tmpDate = new Date(event.timeStamp);
  let tmpTimeString = formatter
    .format(tmpDate)
    .replace(/\s{1,}/g, " ")
    .replace(",", "")
    .replace(".", "/")
    .replace(":", "-");

  if (!isOpen) return null;

  function validate() {
    if (
      tmpTimeString.length < 5 ||
      !tmpTimeString.match(/\d\d\/\d\d(\s\d\d:\d\d)*/i) ||
      !tmpTimeStamp(tmpTimeString)
    ) {
      setErrors(["incorrect date/time"]);
      return false;
    }
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

  function tmpTimeStamp(tmpTimeString) {
    // memo: tmpTimeString = trimmed, unDoubleSpaced
    let tmpTime = "T00:00";
    if (
      tmpTimeString.length > 10 &&
      tmpTimeString.slice(7, 9) > "" &&
      tmpTimeString.slice(7, 9) < "24" &&
      tmpTimeString.slice(7, 9) >= "00" &&
      tmpTimeString.slice(10, 12) > "" &&
      tmpTimeString.slice(10, 12) < "60" &&
      tmpTimeString.slice(10, 12) >= "00"
    ) {
      tmpTime =
        "T" + tmpTimeString.slice(7, 9) + ":" + tmpTimeString.slice(10, 12);
    }

    let tmpDate =
      "2021-" +
      tmpTimeString.slice(3, 5) +
      "-" +
      tmpTimeString.slice(0, 2) +
      tmpTime;
    if (Date.parse(tmpDate)) {
      return Date.parse(tmpDate);
    } else {
      return null;
    }
  }

  return (
    <FlexBgDiv>
      <FlexPopupDiv>
        {/* input area */}
        <SoloDiv>
          <label>
            Date, Time: &nbsp;
            <input
              id="inputDateTime"
              defaultValue={tmpTimeString}
              onChange={(e) => {
                if (e.target.value > "") {
                  setErrors([]);
                } else {
                  setErrors(["! incorrect date/time"]);
                }
                tmpTimeString = 
                  e.target.value
                    .replace(",", " ")
                    .replace(/\s{1,}/g, " ")
                    .replace(".", "/")
                    .replace(":", "-")
                ;
                const tts = tmpTimeStamp(tmpTimeString);
                if (tts) {
                  setSingleUpdatedEvent((prev) => {const newValue = {...prev, timeStamp: tts}; return newValue;});
                }
              }}
              style={{ width: "160px" }}
            />
          </label>
        </SoloDiv>
        <SoloDiv>
          <label>
            {" "}
            Header:{" "}
            <input
              id="inputHeader"
              value={singleUpdatedEvent.header}
              onChange={(e) => {
                setSingleUpdatedEvent((prev)=>({
                  ...prev,
                  header: e.target.value
                }));
                if (e.target.value.length < 3) {
                  setErrors(["! header is too short"]);
                } else {
                  setErrors([]);
                }
              }}
              style={{ width: "250px" }}
            />
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
                setSingleUpdatedEvent((prev)=>({
                  ...prev,
                  who: e.target.value
                }));
                if (e.target.value.match(/[^\d\w\sа-я,.!;]/i)) {
                  setErrors(["! members list has wrong symbols"]);
                } else {
                  setErrors([]);
                }
              }}
              style={{ width: "250px" }}
            />
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
                setSingleUpdatedEvent((prev)=>({
                  ...prev,
                  description: e.target.value
                }));
                if (e.target.value.match(/[^\d\w\sа-я,.!;]/i)) {
                  setErrors(["! description text has wrong symbols"]);
                } else {
                  setErrors([]);
                }
              }}
              style={{ width: "250px" }}
            />
          </label>
        </SoloDiv>

        {/* buttons string */}
        <div style={{ textAlign: "right" }}>
          <button onClick={closePopup}>Cancel</button> &nbsp;
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                const tts = tmpTimeStamp(tmpTimeString);
                if (tts) {
                  setSingleUpdatedEvent((prev) => {const newValue = { ...prev, timeStamp: tts }; updateEvent(newValue); return newValue;});
                  console.log(
                    "after - tts=",
                    tts,
                    ". suEvent.timeStamp=",
                    singleUpdatedEvent.timeStamp
                    );
                  }
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
        {errors.length === 0
          ? null
          : errors.map((error) => (
              <div key={error} style={{ color: "red" }}>
                {error}
              </div>
            ))}
      </FlexPopupDiv>
    </FlexBgDiv>
  );
}
