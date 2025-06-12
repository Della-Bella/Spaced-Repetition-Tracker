import { calculateRevisionDates } from "../modules/dateLogic";

describe("calculateRevisionDates", () => {
  test("should return 5 future revision dates with correct format and topic", () => {
    const topic = "algorithms";

    // Use a date 1 day in the future
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const dateString = futureDate.toISOString().split("T")[0];

    const revisions = calculateRevisionDates(dateString, topic);

    // Check length
    expect(revisions.length).toBe(5);

    // Check structure and format
    revisions.forEach(revision => {
      expect(revision.topic).toBe(topic);
      expect(revision.revisionDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
