const request = require("supertest");

const db = require("../models/index");
const app = require("../app");

let server, agent;

describe("Todo test suite", () => {
    
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
        server = app.listen(3000, () => { });
        agent = request.agent(server);
    });


    afterAll(async () => {
      try {
        await db.sequelize.close();
        await server.close();
      } catch (error) {
        console.log(error);
      }
    });

    test("create a new todo", async () => {
        const response = await agent.post('/todos').send({
            'title': 'Buy milk',
            dueDate: new Date().toISOString(),
            completed: false
        });
        expect(response.statusCode).toBe(200);
    });

/*
    test("Mark a todo as complete", async () => {
        const response = await agent.post('/todos').send({
            'title': 'Buy milk',
            dueDate: new Date().toISOString(),
            completed: false
        });
        const parsedResponse = JSON.parse(response.text);
        const todoID = parsedResponse.id;

        expect(parsedResponse.completed).toBe(false);
        
        const markCompleteResponse = await agent.put(`/todos/${todoID}/markAsCompleted`).send();
        const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
        expect(parsedUpdateResponse.completed).toBe(true);
    });*/

});