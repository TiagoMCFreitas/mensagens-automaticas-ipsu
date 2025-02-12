import express from "express";
import {
  startSessionHandler,
  checkSessionStatusHandler,
} from "../src/controllers/messageController";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 🔹 Iniciar o WhatsApp
app.post("/start-session", startSessionHandler);

// 🔹 Verificar o status da sessão
app.get("/check-session", checkSessionStatusHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
