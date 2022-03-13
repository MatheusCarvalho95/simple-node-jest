import { jest, expect, test, describe } from "@jest/globals";
import superTest from "supertest";
import Server from "../../src/server.js";

describe("Api E2E", () => {
  test("GET / - Should return an array", async () => {
    const response = await superTest(Server).get("/");

    const data = JSON.parse(response.text);

    expect(response).toHaveProperty("status", 200);

    expect(data).toBeInstanceOf(Array);
  });

  test("POST / - Save a new item and return ok", async () => {
    const getResponse = await superTest(Server).get("/");
    const existingItems = JSON.parse(getResponse.text);
    const response = await superTest(Server).post("/").send({
      name: "Test",
      age: 20,
    });

    expect(response).toHaveProperty("status", 200);

    expect(response.text).toStrictEqual('{"ok":1}');

    const getResponseUpdated = await superTest(Server).get("/");
    const updatedItems = JSON.parse(getResponseUpdated.text);

    expect(updatedItems.length).toBe(existingItems.length + 1);
  });

  test("DELETE / - Delete all items and return ok", async () => {
    const getResponse = await superTest(Server).get("/");
    const existingItems = JSON.parse(getResponse.text);
    const response = await superTest(Server).delete("/");

    expect(response).toHaveProperty("status", 200);

    expect(response.text).toStrictEqual('{"ok":1}');

    const getResponseUpdated = await superTest(Server).get("/");
    const updatedItems = JSON.parse(getResponseUpdated.text);

    expect(updatedItems.length).toBe(0);
  });
});
