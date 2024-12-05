import { getMessengerBot } from "../libs/messengerBot";
import Message from "../models/Message";
import Ticket from "../models/Ticket";
import ShowTicketService from "../services/TicketServices/ShowTicketService";
import { logger } from "../utils/logger";
import GetTicketWbot from "./GetTicketWbot";
import socketEmit from "./socketEmit";

// Função para marcar todas as mensagens de um ticket como lidas
// @param ticket - Ticket cujas mensagens serão marcadas como lidas
const SetTicketMessagesAsRead = async (ticket: Ticket): Promise<void> => {
  // Atualiza todas as mensagens não lidas do ticket para lidas no banco
  await Message.update(
    { read: true },
    {
      where: {
        ticketId: ticket.id,
        read: false
      }
    }
  );

  // Zera o contador de mensagens não lidas do ticket
  await ticket.update({ unreadMessages: 0 });

  try {
    // Se o canal for WhatsApp, marca as mensagens como vistas no WhatsApp
    if (ticket.channel === "whatsapp") {
      const wbot = await GetTicketWbot(ticket);
      wbot
        .sendSeen(`${ticket.contact.number}@${ticket.isGroup ? "g" : "c"}.us`)
        .catch(e => console.error("não foi possível marcar como lido", e));
    }

    // Se o canal for Messenger, marca as mensagens como vistas no Messenger
    if (ticket.channel === "messenger") {
      const messengerBot = getMessengerBot(ticket.whatsappId);
      messengerBot.markSeen(ticket.contact.messengerId);
    }
  } catch (err) {
    // Registra aviso se não conseguir marcar como lido na plataforma
    logger.warn(
      `Could not mark messages as read. Maybe whatsapp session disconnected? Err: ${err}`
    );
    // throw new Error("ERR_WAPP_NOT_INITIALIZED");
  }

  // Recarrega o ticket para obter dados atualizados
  const ticketReload = await ShowTicketService({
    id: ticket.id,
    tenantId: ticket.tenantId
  });

  // Emite evento via socket para atualizar interface em tempo real
  socketEmit({
    tenantId: ticket.tenantId,
    type: "ticket:update",
    payload: ticketReload
  });
};

export default SetTicketMessagesAsRead;
