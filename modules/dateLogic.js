// dateLogic.js
export function calculateRevisionDates(startDateString, topicName) {
  const startDate = new Date(startDateString);
  if (isNaN(startDate)) {
    throw new Error("Invalid Date Format");
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0); // strip time for date-only comparison

  const revisions = [];

  const addRevision = (date) => {
    if (date >= now) {
      revisions.push({
        topic: topicName,
        revisionDate: date.toISOString()
      });
    }
  };

  const isPastDate = startDate < now;

  // Define intervals based on past/future start date
  const intervals = isPastDate
    ? [
        { months: 1},
        { months: 2},
        { months: 5},
        { months: 11}
      ]
    : [
        { days: 7},
        { months: 1},
        { months: 3},
        { months: 6},
        { years: 1}
      ];

  // Generate future revision dates
  intervals.forEach(({ days, months, years}) => {
    const date = new Date(startDate);
    if (days) date.setDate(date.getDate() + days);
    if (months) date.setMonth(date.getMonth() + months);
    if (years) date.setFullYear(date.getFullYear() + years);

    addRevision(date);
  });

  return revisions;
}

