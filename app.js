import "dotenv/config";

import express from "express";

const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
import routes from "./routes/index.js";
app.use(routes);

app.listen(PORT, () =>
  console.log(`Server started at  http://localhost:${PORT}`)
);
