// controllers/column.controller.ts
import { Request, Response } from "express";
import { createColumnService } from "../services/column.service";
import { AuthRequest } from '../middlewares/auth.middleware';


export const createColumn = async (req: AuthRequest, res: Response) => {
  try {
    const { boardId } = req.params;
    const { title } = req.body;
    const userId = req.user?.userId;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const column = await createColumnService(boardId, userId!, title);
    return res.status(201).json(column);

  } catch (error: any) {
    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message || 'Internal server error' });
  }
};
