import express from "express";
import homepageRouter from "./homepageRouter.js";


const port = process.env.PORT || 3000;

const app = express();
app.use(homepageRouter);
app.get("/", (_req, res) => {
  res.json({ message: "Hello, world!" });
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});
