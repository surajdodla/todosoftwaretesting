const request = require("supertest");
const app = require("../src/server"); 

describe("Todo API - Integration Tests", () => {
    let todoId; 

    test("GET /api/todos should return an empty list of tasks initially", async () => {
        const response = await request(app).get("/api/todos");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]); 
    });

    test("POST /api/todos should successfully add a new task", async () => {
        const newTodo = { text: "Configure CI/CD pipeline" };
        const response = await request(app).post("/api/todos").send(newTodo);

        expect(response.status).toBe(201);
        expect(response.body.text).toBe(newTodo.text);
        expect(response.body).toHaveProperty("id");

        todoId = response.body.id; 
    });

    test("PUT /api/todos/:id should modify an existing task", async () => {
        const updatedText = { text: "Enhance CI/CD workflow" };
        const response = await request(app).put(`/api/todos/${todoId}`).send(updatedText);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Todo updated");
    });

    test("DELETE /api/todos/:id should remove a specific task", async () => {
        const response = await request(app).delete(`/api/todos/${todoId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Todo deleted");
    });

    test("DELETE /api/todos/:id should return 404 if task ID is not found", async () => {
        const response = await request(app).delete(`/api/todos/99999`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Todo not found");
    });
});
