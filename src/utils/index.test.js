import { isNotEmptyArray } from "utils";

test("isNotEmptyArray returns true wiht not empty array", () => {
  expect(isNotEmptyArray([1, 2])).toBe(true);
});

test("isNotEmptyArray returns false wiht empty array", () => {
  expect(isNotEmptyArray([])).toBe(false);
});

test("isNotEmptyArray returns false with a non array", () => {
  expect(isNotEmptyArray(undefined)).toBe(false);
  expect(isNotEmptyArray(null)).toBe(false);
  expect(isNotEmptyArray(3)).toBe(false);
  expect(isNotEmptyArray("4")).toBe(false);
  expect(isNotEmptyArray({})).toBe(false);
});
