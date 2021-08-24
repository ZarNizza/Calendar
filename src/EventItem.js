export function EventItem(props) {
  // arr Events [{id: Math.random(), timeStamp:"", header:"", who:"", description:""}]
// const {eventItem, setEventToEdit, deleteItem} = props;
const eventItem = props.eventItem;
const setEventToEdit = props.setEventToEdit;
const deleteItem = props.deleteItem;
console.log("eventItem - listing: props / eventItem");
console.log(props);
console.log(eventItem);
const date = new Date(eventItem.timeStamp);
const day = date.getDate();
const month = date.getMonth();
const time = date.getHours() + "-" + date.getMinutes();

  return (
    <li >{
        day + "/" + month + " " + time +
        ' "' + eventItem.header + '"' +
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
