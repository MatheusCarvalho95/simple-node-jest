import Server from "./server.js";

const port = Number(process.argv.slice(2));

//kill the process if is not a valid port

if (!port || isNaN(port)) {
  console.log("Invalid port");
  process.exit(1);
}

const server = Server.listen(port).on("listening", () =>
  console.log(`Server is listening on port ${server.address().port}`),
);
