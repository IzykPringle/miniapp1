import routePath from "./routes.js";
import express from 'express';
const app = express();

app.use(express.json())
app.use(routePath)

export default app;