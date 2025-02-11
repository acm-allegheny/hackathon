import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express()
const PORT = 8080
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "index.html"));
})

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
