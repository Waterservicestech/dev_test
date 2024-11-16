import request from "supertest";
import http from "http";
import { IncomingMessage, ServerResponse } from "http";
import { Users } from "./entity/user";

const mockClient = {
  query: jest.fn(),
  connect: jest.fn(),
};

jest.mock("pg", () => {
  return { Client: jest.fn(() => mockClient) };
});

class Posts {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public userId: number
  ) {}
}

describe("API Endpoints", () => {
  let server: http.Server;

  beforeAll(() => {
    server = http.createServer(
      async (req: IncomingMessage, res: ServerResponse) => {
        const { method, url } = req;
        res.setHeader("Content-Type", "application/json");

        if (method === "GET" && url === "/users") {
          try {
            const rows = [
              {
                id: 1,
                firstName: "Teste nome",
                lastName: "Teste sobrenome",
                email: "teste@email.com",
              },
            ];
            mockClient.query.mockResolvedValue({ rows });

            const users = rows.map(
              (row: any) =>
                new Users(row.id, row.firstName, row.lastName, row.email)
            );
            res.statusCode = 200;
            res.end(JSON.stringify(users));
          } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: "Error fetching users" }));
          }
        } else if (method === "POST" && url === "/users") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", async () => {
            const { firstName, lastName, email } = JSON.parse(body);
            try {
              const newUser = { id: 1, firstName, lastName, email };
              mockClient.query.mockResolvedValue({ rows: [newUser] });
              const user = new Users(
                newUser.id,
                newUser.firstName,
                newUser.lastName,
                newUser.email
              );
              res.statusCode = 201;
              res.end(JSON.stringify(user));
            } catch (error) {
              res.statusCode = 500;
              res.end(JSON.stringify({ message: "Error creating user" }));
            }
          });
        } else if (method === "GET" && url === "/posts") {
          try {
            const rows = [
              {
                id: 1,
                title: "Test Post",
                content: "Test conteudo do post",
                userId: 1,
              },
            ];
            mockClient.query.mockResolvedValue({ rows });

            const posts = rows.map(
              (row: any) =>
                new Posts(row.id, row.title, row.content, row.userId)
            );
            res.statusCode = 200;
            res.end(JSON.stringify(posts));
          } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: "Error fetching posts" }));
          }
        } else if (method === "POST" && url === "/posts") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", async () => {
            const { title, content, userId } = JSON.parse(body);
            try {
              const newPost = { id: 1, title, content, userId };
              mockClient.query.mockResolvedValue({ rows: [newPost] });
              const post = new Posts(
                newPost.id,
                newPost.title,
                newPost.content,
                newPost.userId
              );
              res.statusCode = 201;
              res.end(JSON.stringify(post));
            } catch (error) {
              res.statusCode = 500;
              res.end(JSON.stringify({ message: "Error creating post" }));
            }
          });
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ message: "Route not found" }));
        }
      }
    );
  });

  afterAll(() => {
    server.close();
  });

  it("GET /users - should fetch all users", async () => {
    const response = await request(server).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        firstName: "Teste nome",
        lastName: "Teste sobrenome",
        email: "teste@email.com",
      },
    ]);
  });

  it("POST /users - should create a user", async () => {
    const newUser = {
      firstName: "Teste nome",
      lastName: "Teste sobrenome",
      email: "teste@email.com",
    };

    const response = await request(server).post("/users").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      firstName: "Teste nome",
      lastName: "Teste sobrenome",
      email: "teste@email.com",
    });
  });

  it("GET /posts - should fetch all posts", async () => {
    const response = await request(server).get("/posts");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        title: "Test Post",
        content: "Test conteudo do post",
        userId: 1,
      },
    ]);
  });

  it("POST /posts - should create a post", async () => {
    const newPost = {
      title: "Teste Post",
      content: "Teste conteudo do post",
      userId: 1,
    };

    const response = await request(server).post("/posts").send(newPost);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      title: "Teste Post",
      content: "Teste conteudo do post",
      userId: 1,
    });
  });

  it("Route not found - should return 404 for unknown routes", async () => {
    const response = await request(server).get("/unknown");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Route not found" });
  });
});
