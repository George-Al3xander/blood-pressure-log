import { server } from "@/mocks/server";
import "@inrupt/jest-jsdom-polyfills";
import "@testing-library/jest-dom";
import "whatwg-fetch";
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
