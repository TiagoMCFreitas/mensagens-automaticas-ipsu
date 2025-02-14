import { Request, Response } from "express";
import {
  getQrCode,
  clientDestroy,
  initializeWhatsAppClient,
  isWhatsAppReady,
  sendMessageToTeam,
} from "../services/whatsappService";

export const startSession = async (req: Request, res: Response) => {
  await initializeWhatsAppClient();
  //new promise
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (getQrCode()) {
        resolve({ qrCode: getQrCode() });
      } else {
        resolve("Sessão iniciada com sucesso.");
      }
    }, 7000);
  });
  return promise;
};

export const clientDestroyHandler = async (req: Request, res: Response) => {
  await clientDestroy()
    .then(() => {
      return res.status(200).json({ success: "Sessão encerrada com sucesso." });
    })
    .catch((error) => {
      return res.status(500).json({ error: error });
    });
};

export const sendMessageToTeamHandler = async (req: Request, res: Response) => {
  const { team, message } = req.body;

  await sendMessageToTeam(team, message)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(500).json({ error: error });
    });
};

export const checkSessionStatus = async (req: Request, res: Response) => {
  if (isWhatsAppReady()) {
    return res
      .status(200)
      .json({ success: "WhatsApp está conectado e pronto para uso." });
  } else {
    return res
      .status(404)
      .json({ error: "WhatsApp não está conectado. Escaneie o QR Code." });
  }
};

export const startSessionHandler = async (req: Request, res: Response) => {
  await startSession(req, res)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(500).json({ error: error });
    });
};

export const checkSessionStatusHandler = async (
  req: Request,
  res: Response
) => {
  await checkSessionStatus(req, res);
};
