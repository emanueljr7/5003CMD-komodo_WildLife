import express from "express";
import cors from "cors";
import dbconnection from "./lib/dbconnection.js";
import userRoutes from "./Routes/users.route.js";
import dotenv from "dotenv";

dotenv.config()

const app = express()

app.use(express.json())

dbconnection()

app.use(cors())

const PORT = process.env.PORT || 3000;

app.use("/user", userRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app