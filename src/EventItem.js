export function EventItem(props) {
  // arr Events [{id: Math.random(), timeStamp:"", header:"", who:"", description:""}]
  const {event, setEventToEdit, deleteItem} = props;
  //timestamp
const day = "31";
const month = "04";
const year = "2021";
const time = event.timeStamp;

  return (
    <li >{
        event.day + "/" + event.month +
        (event.time > " " ? ", " : "") + event.time +
        '"' + event.header + '"' +
        " - " + event.who + " - " +
        event.description}{" "}
      <button
        onClick={() => {
          setEventToEdit(event);
        }}
      >
        edit
      </button>{" "}
      &nbsp;
      <button onClick={() => deleteItem(event)}>del(X)</button>
    </li>
  );
}
