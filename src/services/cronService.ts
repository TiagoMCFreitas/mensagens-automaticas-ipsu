import cron from "node-cron";
import { sendMessageToContact } from "./whatsappService";

export function messageCronJob(alternateEquipe: number) {
  const job = cron.schedule("30 13 * * 3", async () => {
    console.log("⏳ Iniciando envio de mensagens semanal...");

    const message = `📢 Lembrete para a Equipe ${
      alternateEquipe === 1 ? "1" : "2"
    } de Música (Se você não está escalado, desconsidere essa mensagem) 🎶
      Graça e paz, irmãos! 🙌
      Só passando para lembrar que hoje é o último dia para fazer qualquer alteração nas tonalidades das músicas. 
      Se houver alguma mudança necessária, por favor, me avisem até o final do dia 
      para que possamos organizar tudo direitinho.
      Qualquer dúvida, estou à disposição! Deus abençoe vocês! 🙏🎼🎤
      ✉️ Equipe de Música`;

    const response = await sendMessageToContact(message);
    console.log(response);
  });

  job.start();
}
