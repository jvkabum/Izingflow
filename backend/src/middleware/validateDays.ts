// src/middleware/validateDays.ts

import { Request, Response, NextFunction } from 'express';

// Middleware para validar o valor de 'daysToClose'
export const validateDaysToCloseTicket = (req: Request, res: Response, next: NextFunction) => {
  const { daysToClose } = req.body;

  // Verifica se 'daysToClose' é um número
  if (typeof daysToClose !== 'number') {
    return res.status(400).json({
      message: "'daysToClose' deve ser um número."
    });
  }

  // Verifica se 'daysToClose' está dentro do intervalo permitido (1 a 365 dias)
  if (daysToClose < 1 || daysToClose > 365) {
    return res.status(400).json({
      message: "'daysToClose' deve ser um número entre 1 e 365."
    });
  }

  // Se a validação passar, chama o próximo middleware
  next();
};
