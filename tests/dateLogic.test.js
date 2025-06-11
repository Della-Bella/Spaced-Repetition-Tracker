import { calculateRevisionDates } from "../modules/dateLogic";

describe('calculateRevisionDates', () => {
    const topic = "codeWars"

    test('future dates should return 5 revision days', () => {
        const today = new Date()
        today.setDate(today.getDate() + 1) // future date
        const dateString = today.toISOString().split('T')[0]
        const revision = calculateRevisionDates(dateString, topic)

        expect(revision.length).toBe(5)
    });
    
});


