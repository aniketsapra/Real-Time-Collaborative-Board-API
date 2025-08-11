import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const createCard = async (req: AuthRequest, res: Response) => {
  const { columnId } = req.params;
  const { title, description } = req.body;
  const userId = req.user?.userId;

  const column = await prisma.column.findUnique({
    where: { id: columnId },
    include: { board: { include: { members: true } } },
  });

  if (!column) return res.status(404).json({ message: 'Column not found' });

  const isMember = column.board.members.some(m => m.userId === userId);
  if (!isMember && column.board.ownerId !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const card = await prisma.card.create({
    data: {
      title,
      description,
      columnId,
      order: 0,
    },
  });

  // Emit card_created to that board's room
  req.io?.to(column.boardId).emit('card_created', { card });

  return res.status(201).json(card);
};
