// modules/dateLogic.js



export function calculateRevisionDates(startDateString, topicName) {
    const startDate = new Date(startDateString);
    if (isNaN(startDate)) {
        throw new Error("Invalid Date Format");
    }

    const revisions = [];


    const addRevision = (date) => {
        revisions.push({
            topic: topicName,
            revisionDate: date.toISOString()
        });
    };

  
    const intervals = [
        { days: 7 },
        { months: 1 },
        { months: 3 },
        { months: 6 },
        { years: 1 }
    ];

   
    intervals.forEach(({ days, months, years }) => {
        
        const date = new Date(startDate);
        if (days) date.setDate(date.getDate() + days);
        if (months) date.setMonth(date.getMonth() + months);
        if (years) date.setFullYear(date.getFullYear() + years);
        addRevision(date);
    });

    return revisions;
  }