import express from "express";
import myJson from "../dist/src/.vite/manifest.json"
const router = express.Router();

router.get("/", (_req, res) => {
  res.render("index.html.ejs", {main:myJson["src/main.ts"].file,css:myJson["src/main.ts"].css});
});

export default router;