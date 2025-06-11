export function formatDateWithSuffix(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid Date object");
  }

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const getDaySuffix = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const suffix = getDaySuffix(day);
  return `${day}${suffix} ${month} ${year}`;
}
