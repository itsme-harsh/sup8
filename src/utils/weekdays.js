// utils/weekdays.js
export const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getToday() {
  return WEEK_DAYS[new Date().getDay()];
}
