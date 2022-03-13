import { createServer } from "http";
import { once } from "events";
import { randomUUID } from "crypto";

const Database = new Map();

function responseToJSON(data, response) {
  return response.end(JSON.stringify(data));
}

async function handler(request, response) {
  const { method } = request;

  if (method === "GET") {
    return responseToJSON([...Database.values()], response);
  }
  if (method === "POST") {
    const body = JSON.parse(await once(request, "data"));
    const id = randomUUID();
    Database.set(id, body);

    return responseToJSON({ ok: 1 }, response);
  }
  if (method === "PUT") {
    return;
  }
  if (method === "DELETE") {
    Database.clear();
    return responseToJSON({ ok: 1 }, response);
  }
}

export default createServer(handler);
