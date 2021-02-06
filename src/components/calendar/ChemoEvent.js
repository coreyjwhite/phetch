export default function ChemoAppointment({ event }) {
  return (
    <span>
      <strong>{event.patient}</strong>{" "}
      {event.drug.map(d => {
        return `${d} `;
      })}
    </span>
  );
}
