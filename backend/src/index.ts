import express, { Express } from "express";
import path from 'path';
import router from "./router";

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'frontend')))

app.use("/api", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});