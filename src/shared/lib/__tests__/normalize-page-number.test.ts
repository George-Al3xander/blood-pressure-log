import { describe, expect, it } from "vitest";
import { normalizePageNumber } from "../normalize-page-number";

describe("normalizePageNumber", () => {
    it("should return the number if valid", () => {
        expect(normalizePageNumber(2, 5)).toBe(2);
        expect(normalizePageNumber("3", 5)).toBe(3);
    });

    it("should coerce string to number if within range", () => {
        expect(normalizePageNumber("4", 5)).toBe(4);
    });

    it("should return 1 if number is less than 1", () => {
        expect(normalizePageNumber(0, 5)).toBe(1);
        expect(normalizePageNumber(-10, 5)).toBe(1);
    });

    it("should return 1 if number is greater than max", () => {
        expect(normalizePageNumber(10, 5)).toBe(1);
        expect(normalizePageNumber("100", 50)).toBe(1);
    });

    it("should return 1 if value is undefined, null, or NaN", () => {
        expect(normalizePageNumber(undefined, 5)).toBe(1);
        expect(normalizePageNumber(null, 5)).toBe(1);
        expect(normalizePageNumber("NaN", 5)).toBe(1);
    });

    it("should handle array input by using the first element", () => {
        expect(normalizePageNumber(["2", "3"], 5)).toBe(2);
        expect(normalizePageNumber(["invalid", "2"], 5)).toBe(1);
    });

    it("should return 1 if input is not coercible to a number", () => {
        expect(normalizePageNumber("abc", 5)).toBe(1);
        expect(normalizePageNumber(["xyz"], 5)).toBe(1);
    });

    it("should clamp correctly when max is 1", () => {
        expect(normalizePageNumber(1, 1)).toBe(1);
        expect(normalizePageNumber(2, 1)).toBe(1);
        expect(normalizePageNumber("1", 1)).toBe(1);
    });
});
