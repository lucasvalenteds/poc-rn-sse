import * as HTTP from "http";
import { v4 as UUID } from "uuid";
import Faker from "faker";

interface Message {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

function createMessage(): Message {
  return {
    id: UUID(),
    title: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
    content: Faker.lorem.sentence(),
    timestamp: Faker.date.recent().toLocaleString(),
  };
}

interface SseEvent<T> {
  id: string;
  event: string;
  data: T;
}

function createSseEvent(message: Message): SseEvent<string> {
  return {
    id: UUID(),
    event: "new-message",
    data: JSON.stringify(message),
  };
}

const port = 8080;

const server = HTTP.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const handle = setInterval(() => {
    const event = createSseEvent(createMessage());
    response.write(`id: ${event.id}\n`);
    response.write(`event: ${event.event}\n`);
    response.write(`data: ${event.data}\n\n`);
  }, 1500);

  request.on("close", () => {
    clearInterval(handle);
    response.end();
  });
});

server
  .listen(port)
  .once("listening", () => console.log("Server stated on port %s", port));
