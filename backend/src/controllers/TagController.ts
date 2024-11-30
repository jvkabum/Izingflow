import * as Yup from "yup";
import { Request, Response } from "express";
import AppError from "../errors/AppError";

import CreateTagService from "../services/TagServices/CreateTagService";
import ListTagService from "../services/TagServices/ListTagService";
import DeleteTagService from "../services/TagServices/DeleteTagService";
import UpdateTagService from "../services/TagServices/UpdateTagService";

/**
 * Interface que define a estrutura de dados de uma tag
 */
interface TagData {
  tag: string;            // Nome/texto da tag
  color: string;          // Cor para identificação visual
  isActive: boolean;      // Status de ativação da tag
  userId: number;         // ID do usuário que criou/modificou
  tenantId: number | string; // ID do tenant/organização
}

/**
 * Cria uma nova tag no sistema
 * Apenas administradores podem criar tags
 * Valida os dados obrigatórios antes da criação
 */
export const store = async (req: Request, res: Response): Promise<Response> => {
  const { tenantId } = req.user;
  if (req.user.profile !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const newTag: TagData = { ...req.body, userId: req.user.id, tenantId };

  const schema = Yup.object().shape({
    tag: Yup.string().required(),
    color: Yup.string().required(),
    userId: Yup.number().required(),
    tenantId: Yup.number().required()
  });

  try {
    await schema.validate(newTag);
  } catch (error) {
    throw new AppError(error.message);
  }

  const tag = await CreateTagService(newTag);

  return res.status(200).json(tag);
};

/**
 * Lista todas as tags do tenant
 * Permite filtrar por status de ativação
 * Retorna tags ordenadas para fácil visualização
 */
export const index = async (req: Request, res: Response): Promise<Response> => {
  const { tenantId } = req.user;
  const { isActive } = req.query;
  const tags = await ListTagService({
    tenantId,
    // eslint-disable-next-line eqeqeq
    isActive: isActive ? isActive == "true" : false
  });
  return res.status(200).json(tags);
};

/**
 * Atualiza uma tag existente
 * Apenas administradores podem modificar tags
 * Valida os dados antes da atualização
 */
export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { tenantId } = req.user;

  if (req.user.profile !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }
  const tagData: TagData = { ...req.body, userId: req.user.id, tenantId };

  const schema = Yup.object().shape({
    tag: Yup.string().required(),
    color: Yup.string().required(),
    isActive: Yup.boolean().required(),
    userId: Yup.number().required()
  });

  try {
    await schema.validate(tagData);
  } catch (error) {
    throw new AppError(error.message);
  }

  const { tagId } = req.params;
  const tagObj = await UpdateTagService({
    tagData,
    tagId
  });

  return res.status(200).json(tagObj);
};

/**
 * Remove uma tag do sistema
 * Apenas administradores podem remover tags
 * A remoção é permanente e afeta todas as associações
 */
export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { tenantId } = req.user;
  if (req.user.profile !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }
  const { tagId } = req.params;

  await DeleteTagService({ id: tagId, tenantId });
  return res.status(200).json({ message: "Tag deleted" });
};
