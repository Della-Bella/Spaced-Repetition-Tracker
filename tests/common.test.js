
import { getUserIds } from "../modules/common.js"; 

describe("getUserIds", () => {
  test("should return an array of 5 users", () => {
    const users = getUserIds();
    expect(users).toHaveLength(5);
  });
});

