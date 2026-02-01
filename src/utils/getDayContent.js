export function getCurrentWeekOfMonth() {
  const today = new Date();
  const month = today.toLocaleString("en-US", { month: "short" }); // Feb
  const year = today.getFullYear();

  const day = today.getDate();

  // Calculate start of current 7-day block
  const weekStartDay = Math.floor((day - 1) / 7) * 7 + 1;
  let weekEndDay = weekStartDay + 6;

  // Clamp to last day of month
  const lastDayOfMonth = new Date(year, today.getMonth() + 1, 0).getDate();
  if (weekEndDay > lastDayOfMonth) weekEndDay = lastDayOfMonth;

  return {
    start: `${weekStartDay}`,
    end: `${weekEndDay}`,
    month,
  };
}
