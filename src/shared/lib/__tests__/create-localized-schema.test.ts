import { useTranslations } from "next-intl";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { createLocalizedSchema } from "../create-localized-schema";

// eslint-disable-next-line
// @ts-ignore
const mockT = (): ReturnType<typeof useTranslations> => (key, vars) =>
    `${key} ${JSON.stringify(vars)}`;

describe("createLocalizedSchema", () => {
    it("should create a string schema without min/max", () => {
        const schema = createLocalizedSchema(mockT())({
            fieldName: "username",
            dataType: "string",
        });
        expect(() => schema.parse("test")).not.toThrow();
        expect(schema).toBeInstanceOf(z.ZodString);
    });

    it("should throw with correct message on invalid string type", () => {
        const schema = createLocalizedSchema(mockT())({
            fieldName: "username",
            dataType: "string",
        });
        try {
            schema.parse(123); // invalid type
        } catch (e) {
            expect((e as z.ZodError).issues[0]?.message).toBe(
                'string.type {"title":"username"}',
            );
        }
    });

    it("should create a string schema with min and max", () => {
        const schema = createLocalizedSchema(mockT())({
            fieldName: "username",
            dataType: "string",
            min: 3,
            max: 5,
        });
        expect(() => schema.parse("abcd")).not.toThrow();
        expect(() => schema.parse("ab")).toThrow("string.min");
        expect(() => schema.parse("abcdef")).toThrow("string.max");
    });

    it("should create a number schema without min/max", () => {
        const schema = createLocalizedSchema(mockT())({
            fieldName: "age",
            dataType: "number",
        });
        expect(() => schema.parse(10)).not.toThrow();
        expect(schema).toBeInstanceOf(z.ZodNumber);
    });

    it("should throw with correct message on invalid number type", () => {
        const schema = createLocalizedSchema(mockT())({
            fieldName: "age",
            dataType: "number",
        });
        try {
            schema.parse("not a number");
        } catch (e) {
            expect((e as z.ZodError).issues[0]?.message).toBe(
                'number.type {"title":"age"}',
            );
        }
    });

    it("should create a number schema with min and max", () => {
        const schema = createLocalizedSchema(mockT())({
            fieldName: "age",
            dataType: "number",
            min: 5,
            max: 10,
        });
        expect(() => schema.parse(7)).not.toThrow();
        expect(() => schema.parse(4)).toThrow("number.min");
        expect(() => schema.parse(11)).toThrow("number.max");
    });

    it("should create a range schema and allow only specified values", () => {
        const schema = createLocalizedSchema(mockT())({
            fieldName: "level",
            dataType: "range",
            min: 1,
            max: 4,
        });
        expect(() => schema.parse(1)).not.toThrow();
        expect(() => schema.parse(3)).not.toThrow();
        expect(() => schema.parse(0)).toThrow();
        expect(() => schema.parse(2.5)).toThrow("number.int");
        expect(() => schema.parse(4)).not.toThrow();
    });

    it("should throw with correct int validation message on float in range", () => {
        const schema = createLocalizedSchema(mockT())({
            fieldName: "level",
            dataType: "range",
            min: 1,
            max: 5,
        });
        try {
            schema.parse(3.14);
        } catch (e) {
            expect((e as z.ZodError).issues[0]?.message).toBe(
                'number.int {"title":"level"}',
            );
        }
    });

    it("should generate correct localized error messages for string min", () => {
        const schema = createLocalizedSchema(mockT())({
            fieldName: "name",
            dataType: "string",
            min: 5,
        });
        try {
            schema.parse("abc");
        } catch (e) {
            expect((e as z.ZodError).issues[0]?.message).toBe(
                'string.min {"length":5,"title":"name"}',
            );
        }
    });

    it("should generate correct localized error messages for string max", () => {
        const schema = createLocalizedSchema(mockT())({
            fieldName: "name",
            dataType: "string",
            max: 5,
        });
        try {
            schema.parse("abcdef");
        } catch (e) {
            expect((e as z.ZodError).issues[0]?.message).toBe(
                'string.max {"length":5,"title":"name"}',
            );
        }
    });

    it("should generate correct localized error messages for number min", () => {
        const schema = createLocalizedSchema(mockT())({
            fieldName: "count",
            dataType: "number",
            min: 10,
        });
        try {
            schema.parse(5);
        } catch (e) {
            expect((e as z.ZodError).issues[0]?.message).toBe(
                'number.min {"length":10,"title":"count"}',
            );
        }
    });

    it("should generate correct localized error messages for number max", () => {
        const schema = createLocalizedSchema(mockT())({
            fieldName: "count",
            dataType: "number",
            max: 10,
        });
        try {
            schema.parse(15);
        } catch (e) {
            expect((e as z.ZodError).issues[0]?.message).toBe(
                'number.max {"length":10,"title":"count"}',
            );
        }
    });

    it("should generate correct localized error messages for range min", () => {
        const schema = createLocalizedSchema(mockT())({
            fieldName: "difficulty",
            dataType: "range",
            min: 2,
            max: 5,
        });
        try {
            schema.parse(1);
        } catch (e) {
            expect((e as z.ZodError).issues[0]?.message).toBe(
                'number.min {"length":2,"title":"difficulty"}',
            );
        }
    });
});
