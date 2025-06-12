// formatDateWithSuffix test

import { formatDateWithSuffix } from "../dateFormatting.js";
import assert from "node:assert";
import test from "node:test";

// Helper function inside the test to build the expected string dynamically
function createExpectedString(date, expectedDayAndSuffix) {
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${expectedDayAndSuffix} ${month} ${year}`;
}

test.describe("formatDateWithSuffix()", () => {

    test("should correctly format days ending in 1 with 'st'", () => {
        const date1 = new Date(2025, 0, 1);
        const expectedString = createExpectedString(date1, "1st");
        assert.strictEqual(formatDateWithSuffix(date1), expectedString);

        const date21 = new Date(2025, 4, 21);
        const expectedString21 = createExpectedString(date21, "21st");
        assert.strictEqual(formatDateWithSuffix(date21), expectedString21);
    });

    test("should correctly format days ending in 2 with 'nd'", () => {
        const date2 = new Date(2025, 1, 2);
        const expectedString = createExpectedString(date2, "2nd");
        assert.strictEqual(formatDateWithSuffix(date2), expectedString);
    });

    // ... you would continue this pattern for the other tests ...

});