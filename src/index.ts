import "reflect-metadata";
import express, { type Request, type Response } from "express";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.DB_HOST || "localhost",
	port: 3306,
	username: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "password",
	database: process.env.DB_NAME || "test_db",
	entities: [User, Post],
	synchronize: true,
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const initializeDatabase = async () => {
	await wait(20000);
	try {
		await AppDataSource.initialize();
		console.log("Data Source has been initialized!");
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (err) {
		console.error("Error during Data Source initialization:", err);
		process.exit(1);
	}
};

initializeDatabase();

app.post("/users", async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, email } = req.body;
		const user = new User();
		user.firstName = firstName;
		user.lastName = lastName;
		user.email = email;

		await AppDataSource.manager.save(user);
		return res.status(201).json(user);
	} catch (error) {
		console.error("Error creating user:", error);
		return res.status(500).json({ message: "Error creating user" });
	}
});

app.post("/posts", async (req: Request, res: Response) => {
	try {
		const { title, description, userId } = req.body;
		const user = await AppDataSource.manager.findOneBy(User, { id: userId });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const post = new Post();
		post.title = title;
		post.description = description;
		post.user = user;

		await AppDataSource.manager.save(post);
		return res.status(201).json(post);
	} catch (error) {
		console.error("Error creating post:", error);
		return res.status(500).json({ message: "Error creating post" });
	}
});
