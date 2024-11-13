import { QueryTypes } from 'sequelize'; // Importando QueryTypes
import db from "../../database"; // Importe sua conexão com o banco de dados

// Definir interface para o resultado
interface ConfigResult {
  value: string;
}

export const getDaysToClose = async (): Promise<number> => {
  try {
    // Realizando a consulta, agora com parâmetros substituídos corretamente
    const result = await db.query<{ value: string }>('SELECT value FROM public."Settings" WHERE key = ?', {
      replacements: ['daysToClose'],
      type: QueryTypes.SELECT, // Usando QueryTypes corretamente importado
    });

    // Verificar se o resultado está correto
    if (result && result.length > 0) {
      const value = parseInt(result[0].value, 10);
      return !isNaN(value) && value > 0 ? value : 0; // Retorna o valor se for maior que 0, senão 0
    } else {
      // Caso o resultado não seja encontrado, retorna 0
      return 0;
    }
  } catch (error) {
    // Tratar erro de consulta
    console.error('Erro ao recuperar a configuração daysToClose:', error);
    return 0; // Caso haja erro, retorna 0 como fallback
  }
};

export const setDaysToClose = async (days: number): Promise<void> => {
  try {
    // Atualizando o valor de daysToClose no banco
    await db.query('UPDATE public."Settings" SET value = ? WHERE key = ?', {
      replacements: [days.toString(), 'daysToClose'],
    });
  } catch (error) {
    // Tratar erro de atualização
    console.error('Erro ao atualizar daysToClose:', error);
  }
};