import cron from 'node-cron';
import db from '../database'; // Ajuste o caminho conforme necessário
import { getDaysToClose } from '../services/SettingServices/ConfiguraFechamentoTicketService';

const closePendingTickets = async () => {
    try {
        // Obter o número de dias para fechar os Tickets
        const daysToClose = await getDaysToClose();
        
        // Verifica se o valor de daysToClose é válido
        if (daysToClose <= 0) {
            console.error("Configuração inválida de dias para fechamento. O valor de 'daysToClose' deve ser maior que 0.");
            return;
        }
        
        // Calcular a data limite para fechamento dos Tickets
        const cutoffDate = new Date(Date.now() - daysToClose * 24 * 60 * 60 * 1000);

        // Log da data de corte para verificar seu valor
        console.log("Data de corte para fechamento:", cutoffDate.toISOString()); // Exibe a data no formato ISO

        // Parâmetros para a consulta
        const queryParams = ['closed', 'pending', cutoffDate];

        // Log dos parâmetros antes da consulta
        console.log("Parâmetros da consulta:", queryParams);

        // Atualiza Tickets que estão pendentes há mais do que o número de dias especificado
        const result = await db.query(
            'UPDATE public."Tickets" SET status = $1 WHERE status = $2 AND "updatedAt" < $3',
            {
                replacements: queryParams
            }
        );

        // Extrair e verificar o número de linhas afetadas
        const rowsAffected = result[1] as number;

        if (rowsAffected > 0) {
            console.log(`Fechamento automático realizado para ${rowsAffected} ticket(s) pendente(s) há mais de ${daysToClose} dias.`);
        } else {
            console.log("Nenhum ticket pendente foi encontrado para fechamento.");
        }
    } catch (error) {
        console.error("Erro ao fechar Tickets pendentes:", error.message || error);
    }
};

// Configura a tarefa agendada para executar diariamente à meia-noite
const scheduleClosePendingTicketsJob = () => {
    cron.schedule('* * * * *', closePendingTickets); // Executa diariamente à meia-noite
};

export default scheduleClosePendingTicketsJob;
