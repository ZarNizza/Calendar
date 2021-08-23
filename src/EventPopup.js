export function EventPopup({ isOpen, eventToEdit }) {
  if (!isOpen) return null;
  alert("Yes, it is PopUp!");
  return <div>{eventToEdit}</div>;
}
