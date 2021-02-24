function timeDifference(date, fullDate) {
  const d = new Date(date);
  const milliseconds = new Date() - d;
  const seconds = milliseconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const year = d.getFullYear();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  
  if (fullDate) {
    let hours = d.getHours();
    hours = hours > 12 ? `${hours - 12}:${d.getMinutes()} PM` : `${hours}:${d.getMinutes()} AM`
    return `${hours} · ${monthNames[d.getMonth()]} ${d.getDate()}, ${year}`
  } else if (seconds < 60) {
    return `${Math.floor(seconds)}s`;
  } else if (minutes < 60) {
    return `${Math.floor(minutes)}m`;
  } else if (hours < 24) {
    return `${Math.floor(hours)}h`;
  } else if (year === new Date().getFullYear()) {
    return `${monthNames[d.getMonth()]} ${d.getDate()}`
  } else {
    return `${monthNames[d.getMonth()]} ${d.getDate()}, ${year}`
  };
};

export default timeDifference;