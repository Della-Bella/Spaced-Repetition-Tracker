// dateLogic.js
export function calculateRevisionDates(startDateString, topicName) {
  const startDate = new Date(startDateString);
  if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
    throw new Error("Invalid Date Format");
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0); // strip time for date-only comparison

  const revisions = [];

  const addRevision = (date) => {
    if (date >= now) {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, 0);
      const dd = String(date.getDate()).padStart(2, 0);
      revisions.push({
        topic: topicName,
        revisionDate: date.toISOString()
      });
    }
  };

  // Define intervals based on past/future start date

  const intervals = 
    [

        { days: 7},
        { months: 1},
        { months: 3},
        { months: 6},
        { years: 1}
      ];

  // Generate future revision dates
  intervals.forEach(({ days = 0, months = 0, years = 0}) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + days);
    date.setMonth(date.getMonth() + months);
    date.setFullYear(date.getFullYear() + years);

    addRevision(date);
  });

  return revisions;
}

