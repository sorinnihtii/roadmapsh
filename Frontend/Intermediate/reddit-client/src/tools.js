export function convertTime(time) {
  const date = new Date(time);
  const now = new Date();

  const milliseconds = now - date;
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return seconds === 0 ? "just now" : seconds + " seconds ago";
  }
  if (minutes < 60) {
    return minutes === 1 ? "1 minute ago" : minutes + " minutes ago";
  }
  if (hours < 24) {
    return hours === 1 ? "1 hour ago" : hours + " hours ago";
  }
  if (days < 30) {
    return days === 1 ? "1 day ago" : days + " days ago";
  }
  if (months < 12) {
    return months === 1 ? "1 month ago" : months + " months ago";
  }
  return years === 1 ? "1 year ago" : years + " years ago";
}
