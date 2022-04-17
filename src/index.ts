import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import router from "./routes/index.js"
dotenv.config();

const server = express();
server.use(cors());
server.use(json());
server.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});