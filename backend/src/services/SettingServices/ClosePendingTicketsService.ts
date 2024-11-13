// services/ClosePendingTicketsService.ts
import Ticket from '../../models/Ticket';
import { getDaysToClose } from './ConfiguraFechamentoTicketService';
import { Op } from 'sequelize';

export class ClosePendingTicketsService {
    async execute() {
        const daysToClose = await getDaysToClose(); // Busca o valor configurado
        const dataLimite = new Date();
        dataLimite.setDate(dataLimite.getDate() - daysToClose);

        const ticketsPendentes = await Ticket.findAll({
            where: {
                status: 'pendente',
                last_interaction: { [Op.lt]: dataLimite }
            }
        });

        for (const ticket of ticketsPendentes) {
            ticket.status = 'fechado';
            await ticket.save();
            console.log(`Ticket ${ticket.id} fechado automaticamente.`);
        }
    }
}
