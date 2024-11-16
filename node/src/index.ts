import http from "http";
import { Client } from "pg";
import { Users } from "./entity/user";
import { Posts } from "./entity/post";
import dotenv from "dotenv";
import { IncomingMessage, ServerResponse } from "http";

dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

client.connect().then(() => {
  const server = http.createServer(
    async (req: IncomingMessage, res: ServerResponse) => {
      const { method, url } = req;
      res.setHeader("Content-Type", "application/json");

      if (method === "GET" && url === "/users") {
        try {
          const result = await client.query('SELECT * FROM "user"');
          const users = result.rows.map((row: any) => ({
            id: row.id,
            firstName: row.firstname,
            lastName: row.lastname,
            email: row.email,
          }));

          res.statusCode = 200;
          res.end(JSON.stringify(users));
        } catch (error) {
          res.statusCode = 500;
          res.end(JSON.stringify({ message: "Error fetching users" }));
        }
      } else if (method === "GET" && url?.startsWith("/posts")) {
        const urlParams = new URLSearchParams(url.split("?")[1]);
        const userId = urlParams.get("userId");

        if (userId) {
          try {
            const result = await client.query(
              "SELECT * FROM post WHERE userId = $1",
              [userId]
            );
            const posts = result.rows.map(
              (row: any) =>
                new Posts(row.id, row.title, row.description, row.userId)
            );
            res.statusCode = 200;
            res.end(JSON.stringify(posts));
          } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: "Error fetching posts" }));
          }
        } else {
          res.statusCode = 400;
          res.end(JSON.stringify({ message: "userId is required" }));
        }
      } else if (method === "POST" && url === "/users") {
        try {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });

          req.on("end", async () => {
            const { firstName, lastName, email } = JSON.parse(body);

            if (!firstName || !lastName || !email) {
              res.statusCode = 400;
              return res.end(
                JSON.stringify({
                  message:
                    "All fields (firstName, lastName, email) are required",
                })
              );
            }

            const result = await client.query(
              'INSERT INTO "user" (firstName, lastName, email) VALUES ($1, $2, $3) RETURNING *',
              [firstName, lastName, email]
            );

            const newUser = result.rows[0];

            const userResponse = {
              id: newUser.id,
              firstName: newUser.firstname,
              lastName: newUser.lastname,
              email: newUser.email,
            };

            res.statusCode = 201;
            res.end(JSON.stringify(userResponse));
          });
        } catch (error) {
          res.statusCode = 500;
          res.end(JSON.stringify({ message: "Error creating user" }));
        }
      } else if (method === "POST" && url === "/posts") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", async () => {
          const { title, description, userId } = JSON.parse(body);

          try {
            const result = await client.query(
              'INSERT INTO post (title, description, "userid") VALUES ($1, $2, $3) RETURNING *',
              [title, description, userId]
            );
            const newPost = result.rows[0];
            const createdPost = new Posts(
              newPost.id,
              newPost.title,
              newPost.description,
              newPost.userId
            );
            res.statusCode = 201;
            res.end(JSON.stringify(createdPost));
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

  const port = 3000;
  server.listen(port, () => {});
});
