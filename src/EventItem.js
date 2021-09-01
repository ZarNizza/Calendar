export function EventItem(props) {
  // memo: arr Events [{id: Math.random(), timeStamp:"", header:"", who:"", description:""}]
  const eventItem = props.eventItem;
  const setEventToEdit = props.setEventToEdit;
  const deleteItem = props.deleteItem;
  const date = new Date(eventItem.timeStamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  let time =
    " " +
    (date.getHours() < 10 ? "0" : "") +
    date.getHours() +
    ":" +
    (date.getMinutes() < 10 ? "0" : "") +
    date.getMinutes();
  if (time === " 00:00") {
    time = "";
  }

  return (
    <li>
      {day + '/' + month + time + 
        ' "' + eventItem.header + '"' +
        ' - ' + eventItem.who + 
        ' - ' + eventItem.description}{" "}
      <button onClick={() => setEventToEdit(eventItem)}>edit</button> &nbsp;
      <button onClick={() => deleteItem(eventItem)}>del(X)</button>
    </li>
  );
}
