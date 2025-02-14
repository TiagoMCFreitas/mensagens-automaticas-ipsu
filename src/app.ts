import express from "express";
import {
  startSessionHandler,
  checkSessionStatusHandler,
  sendMessageToTeamHandler,
  clientDestroyHandler,
} from "../src/controllers/messageController";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 🔹 Iniciar o WhatsApp
app.post("/start-session", startSessionHandler);

// 🔹 Verificar o status da sessão
app.get("/check-session", checkSessionStatusHandler);

// 🔹 Enviar mensagem para uma equipe
app.post("/send-message-to-team", sendMessageToTeamHandler);

// 🔹 Encerrar sessão
app.post("/client-destroy", clientDestroyHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
