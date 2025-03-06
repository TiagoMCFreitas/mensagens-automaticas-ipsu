import { Client, LocalAuth } from "whatsapp-web.js";
import {
  lembreteEstudarAsMusicasCronJob,
  lembreteTonalidadeCronJob,
} from "./cronService";
import fs from "fs";

let client: Client | null = null;
let qrCode: string | null = null;
let isReady: boolean = false;
let alternateEquipe: number = 1;

const equipe1 = [
  "556299774352",
  "556298045762",
  "556291194927",
  "556294852771",
  "556496473340",
  "556298248986",
  "556294340706",
  "556293315408",
  "556184762222",
  "556299183193",
];
const equipe2 = [
  "556281436512",
  "556291060645",
  "556291218523",
  "556292243354",
  "556292729067",
  "556291177135",
  "556284681132",
  "556292079634",
  "556285949952",
  "556285516794",
  "556282177820",
  "556281907486",
  "556292685213",
];

export const initializeWhatsAppClient = async () => {
  if (client) {
    console.log("WhatsApp já está iniciado.");
    return;
  }
  client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: "/opt/bin/chromium",
    },
  });

  client.on("ready", () => {
    console.log("WhatsApp está pronto para uso.");
    isReady = true;
    qrCode = null; // Apaga o QR Code após autenticação
  });

  client.on("qr", (qr: string) => {
    qrCode = qr;
  });

  client.on("disconnected", (reason) => {
    console.log(`WhatsApp desconectado: ${reason}`);
    isReady = false;
    client = null; // Remove a instância para forçar nova conexão
  });

  client.on("error", (error: Error) => {
    console.error("Client error:", error);
  });

  client.initialize();
  return client;
};

export const getQrCode = () => {
  if (qrCode) {
    return qrCode;
  } else {
    return null;
  }
};

export const clientDestroy = async () => {
  if (client) {
    await client.destroy();
    client = null;

    try {
      fs.rmSync("./.wwebjs_auth", { recursive: true, force: true });
    } catch (err) {
      console.error("Erro ao remover sessão:", err);
    }
  }
};

export const getQrCodeImage = async () => {};

export const isWhatsAppReady = () => {
  return isReady;
};

export const whoEquipeIs = async () => {
  if (alternateEquipe) {
    return "Equipe: " + alternateEquipe;
  } else {
    return "Houve um erro ao identificar a equipe.";
  }
};

export const alternateEquipeHandler = async () => {
  if (alternateEquipe === 1) {
    alternateEquipe = 2;
    return "Equipe 2";
  } else {
    alternateEquipe = 1;
    return "Equipe 1";
  }
};
export const sendMessageToContact = async (
  message: string,
  alternate: boolean
) => {
  if (!client || !isReady) {
    return { error: "WhatsApp não está pronto. Conecte-se primeiro." };
  }

  let results = [];

  if (alternateEquipe === 1) {
    for (const contact of equipe1) {
      const chatId = `${contact}@c.us`;

      try {
        await client.sendMessage(chatId, message);
        results.push({ chatId, status: "success" });
      } catch (error) {
        console.error(`❌ Erro ao enviar para ${contact}:`, error);
        results.push({ chatId, status: "failed" });
      }
    }
    await client.sendMessage(
      "556299183193@c.us",
      "Mensagem enviada para equipe 1."
    );
    if (alternate) {
      alternateEquipe = 2;
    }
  } else {
    for (const contact of equipe2) {
      const chatId = `${contact}@c.us`;

      try {
        await client.sendMessage(chatId, message);
        results.push({ chatId, status: "success" });
      } catch (error) {
        console.error(`❌ Erro ao enviar para ${contact}:`, error);
        results.push({ chatId, status: "failed" });
      }
    }
    await client.sendMessage(
      "556299183193@c.us",
      "Mensagem enviada para equipe 2."
    );
    if (alternate) {
      alternateEquipe = 1;
    }
  }

  return { results };
};

export const sendMessageToTeam = async (team: string, message: string) => {
  if (!client || !isReady) {
    return { error: "WhatsApp não está pronto. Conecte-se primeiro." };
  }
  const contacts = team === "equipe1" ? equipe1 : equipe2;

  for (const contact of contacts) {
    const chatId = `${contact}@c.us`;
    try {
      await client.sendMessage(chatId, message);
    } catch (error) {
      console.error(`❌ Erro ao enviar para ${contact}:`, error);
    }
  }
};

lembreteTonalidadeCronJob(alternateEquipe === 1 ? 1 : 2);
lembreteEstudarAsMusicasCronJob();
