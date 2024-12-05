import { BullAdapter, setQueues, router as bullRoute } from "bull-board";
import Queue from "../libs/Queue";

// Função de inicialização do sistema de filas BullMQ
// Responsável por configurar e iniciar o processamento de tarefas em background
export default async function bullMQ(app) {
  // Indica que o sistema de filas foi iniciado
  console.info("bullMQ started");

  // Inicia o processamento das filas definidas
  await Queue.process();

  // Adiciona tarefas programadas às filas
  // Comentado: await Queue.add("VerifyScheduleMessages", {});
  
  // Adiciona tarefa para verificar tickets inativos do chatbot
  // Esta fila monitora e processa tickets que não têm atividade recente
  await Queue.add("VerifyTicketsChatBotInactives", {});

  // Adiciona tarefa para envio de mensagens agendadas
  // Esta fila gerencia o envio de mensagens programadas para horários específicos
  await Queue.add("SendMessageSchenduled", {});

  // Em ambiente de desenvolvimento, configura interface de administração das filas
  if (process.env.NODE_ENV !== "production") {
    // Configura adaptadores para visualização das filas no painel admin
    setQueues(Queue.queues.map((q: any) => new BullAdapter(q.bull) as any));
    
    // Adiciona rota para acessar o painel de administração das filas
    // Acessível em /admin/queues
    app.use("/admin/queues", bullRoute);
  }
}
