const request = require("supertest");

const database = require("../models/index");
const app = require("../app");
const { json } = require("sequelize");

let Server, Agent;

describe("Todo Application", function () {
  beforeAll(async () => {
    await database.sequelize.sync({ force: true });
    Server = app.listen(3000, () => {});
    Agent = request.agent(Server);
  });

  afterAll(async () => {
    try {
      await database.sequelize.close();
      await Server.close();
    } catch (error) {
      console.log(error);
    }
  });

  test("Creates a todo and responds with json at /todos POST endpoint", async () => {
    const response = await Agent.post("/todos").send({
      title: "Buy milk",

      dueDate: new Date().toISOString(),
      completed: false,
    });
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    const parsedresponse = JSON.parse(response.text);
    expect(parsedresponse.id).toBeDefined();
  });

  test("Marks a todo with the given ID as complete", async () => {
    const response = await Agent.post("/todos").send({

      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    const parsedresponse = JSON.parse(response.text);
    const todoID = parsedresponse.id;

    expect(parsedresponse.completed).toBe(false);

    const markCompleteResponse = await Agent
      .put(`/todos/${todoID}/markASCompleted`)
      .send();
    const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
    expect(parsedUpdateResponse.completed).toBe(true);
  });

  test("Fetches all todos in the database using /todos endpoint", async () => {
    await Agent.post("/todos").send({
      title: "Buy xbox",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    await Agent.post("/todos").send({
      title: "Buy ps3",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    const response = await Agent.get("/todos");
    const parsedresponse = JSON.parse(response.text);

    expect(parsedresponse.length).toBe(4);
    expect(parsedresponse[3]["title"]).toBe("Buy ps3");
  });

  test("Deletes a todo with the given ID if it exists and sends a boolean response", async () => {
   
    const sent = await Agent.post("/todos").send
    ({
      title:"Buy milk",
      Due:new Date().toISOString(),
      completed:false,
    });
    const parsedresponse=JSON.parse(sent.text);
    const Id=parsedresponse.id;
    const deletedresponse=await Agent.delete(`/todos/${Id}`
    );
  expect(Boolean(deletedresponse.text)).toBe(true);

    
  });
});
