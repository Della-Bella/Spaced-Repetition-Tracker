import { formatDateWithSuffix } from "../modules/dateFormatting.js"; 

describe("formatDateWithSuffix", () => {
    test("formats dates with correct suffixes", () => {
        const testCases = [
        { input: new Date("2025-06-01"), expected: "1st June 2025" },
        { input: new Date("2025-06-02"), expected: "2nd June 2025" },
        { input: new Date("2025-06-03"), expected: "3rd June 2025" },
        { input: new Date("2025-06-04"), expected: "4th June 2025" },
        { input: new Date("2025-06-11"), expected: "11th June 2025" },
        { input: new Date("2025-06-12"), expected: "12th June 2025" },
        { input: new Date("2025-06-13"), expected: "13th June 2025" },
        { input: new Date("2025-06-21"), expected: "21st June 2025" },
        { input: new Date("2025-06-22"), expected: "22nd June 2025" },
        { input: new Date("2025-06-23"), expected: "23rd June 2025" },
        ];

        for (const { input, expected } of testCases) {
        expect(formatDateWithSuffix(input)).toBe(expected);
        }
    });
});
