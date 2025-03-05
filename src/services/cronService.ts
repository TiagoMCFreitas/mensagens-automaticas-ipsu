import cron from "node-cron";
import { sendMessageToContact } from "./whatsappService";

export function lembreteTonalidadeCronJob(alternateEquipe: number) {
  const job = cron.schedule("30 13 * * 3", async () => {
    console.log("⏳ Iniciando envio da mensagem semanal...");

    const message = `📢 Lembrete para a Equipe de Música (Se você não está escalado essa semana, desconsidere essa mensagem) 🎶\nGraça e paz, irmão! 🙌\nSó passando para lembrar que hoje é o último dia para fazer qualquer alteração nas tonalidades das músicas.\nSe houver alguma mudança necessária, por favor, me avise até o final do dia para que possamos organizar tudo direitinho.\nQualquer dúvida, estou à disposição! Deus abençoe você! 🙏🎼🎤\n✉️ Equipe de Música`;

    const response = await sendMessageToContact(message, false);
    console.log(response);
  });

  job.start();
}

export function lembreteEstudarAsMusicasCronJob() {
  const job = cron.schedule("30 13 * * 4", async () => {
    console.log("⏳ Iniciando envio de mensagem semanal...");

    const message = `(Desconsiderar essa mensagem senão estiver escalado essa semana) 📢 Olá, irmão! 🎶\nGraça e paz! 🙌\nPassando para saber se você já teve a oportunidade de estudar as músicas da semana. Caso ainda não tenha conseguido, tire um tempinho do seu dia para dar uma olhada. 🎼✨\nSe surgir qualquer dúvida na letra ou na cifra, fique à vontade para me chamar!\nDeus abençoe você! 🙏🎤\n✉️ Equipe de Música`;

    const response = await sendMessageToContact(message, true);
    console.log(response);
  });

  job.start();
}
