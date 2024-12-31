import Message from "../../models/Message";
import Ticket from "../../models/Ticket";
import Tag from "../../models/Tag"; // Importando o modelo Tag
import ContactTag from "../../models/ContactTag"; // Importando o modelo ContactTag
import socketEmit from "../../helpers/socketEmit";

interface MessageData {
  id?: string;
  messageId: string;
  ticketId: number;
  body: string;
  contactId?: number;
  fromMe?: boolean;
  read?: boolean;
  mediaType?: string;
  mediaUrl?: string;
  timestamp?: number;
}
interface Request {
  messageData: MessageData;
  tenantId: string | number;
}

const CreateMessageService = async ({
  messageData,
  tenantId
}: Request): Promise<Message> => {
  const msg = await Message.findOne({
    where: { messageId: messageData.messageId, tenantId }
  });
  if (!msg) {
    await Message.create({ ...messageData, tenantId });
  } else {
    await msg.update(messageData);
  }
  const message = await Message.findOne({
    where: { messageId: messageData.messageId, tenantId },
    include: [
      {
        model: Ticket,
        as: "ticket",
        where: { tenantId },
        include: ["contact"]
      },
      {
        model: Message,
        as: "quotedMsg",
        include: ["contact"]
      }
    ]
  });

  if (!message) {
    throw new Error("ERR_CREATING_MESSAGE");
  }

  // Lógica para atribuir a tag ao ticket se a mensagem corresponder ao autoTag
  const tags = await Tag.findAll({ where: { tenantId } }); // Buscando todas as tags
  const matchingTag = tags.find(tag =>
    messageData.body.trim().toLowerCase() === tag.autoTag.trim().toLowerCase()
  );

  if (matchingTag) {
    const ticket = await Ticket.findByPk(messageData.ticketId); // Buscando o ticket
    if (ticket) {
      const contactTags = await ContactTag.findAll({
        where: { contactId: ticket.contactId, tagId: matchingTag.id }
      }); // Verificando se o contato já tem a tag

      if (contactTags.length === 0) {
        // Adicionando a tag ao contato se não existir
        await ContactTag.create({
          contactId: ticket.contactId,
          tagId: matchingTag.id,
          tenantId
        });
      }
    }
  }

  socketEmit({
    tenantId,
    type: "chat:create",
    payload: message
  });

  return message;
};

export default CreateMessageService;
