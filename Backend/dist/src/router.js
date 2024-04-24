"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const manifest_json_1 = __importDefault(require("../dist/src/.vite/manifest.json"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.render("index.html.ejs", { main: manifest_json_1.default["src/main.ts"].file, css: manifest_json_1.default["src/main.ts"].css });
});
exports.default = router;
