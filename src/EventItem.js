export function EventItem(props) {
  // arr Events [{id: Math.random(), timeStamp:"", header:"", who:"", description:""}]
const {eventItem, setEventToEdit, deleteItem} = props;
console.log("eventItem - listing");
console.log(eventItem);
const day = eventItem.timeStamp.getDate();
const month = eventItem.timeStamp.getMonth();
const time = eventItem.timeStamp.getHours()+"-"+eventItem.timeStamp.getMinutes();

  return (
    <li >{
        day + "/" + month + " " + time +
        '"' + eventItem.header + '"' +
        " - " + eventItem.who + " - " +
        eventItem.description}{" "}
      <button
        onClick={() => {
          setEventToEdit(eventItem);
        }}
      >
        edit
      </button>{" "}
      &nbsp;
      <button onClick={() => deleteItem(eventItem)}>del(X)</button>
    </li>
  );
}
