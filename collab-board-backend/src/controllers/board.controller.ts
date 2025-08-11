import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { createBoardService } from '../services/board.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { title } = req.body;
    const userId = req.user?.userId; // or req.user?.id based on how you signed the token

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const board = await createBoardService(title, userId);
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};


export const getBoardById = async (req: AuthRequest, res: Response) => {
  const boardId = req.params.id;
  const userId = req.user?.userId;

  try {
    const board = await prisma.board.findFirst({
      where: {
        id: boardId,
        OR: [
          { ownerId: userId },
          { members: { some: { userId: userId } } },
        ],
      },
      include: {
        members: true,
        columns: true,
      },
    });

    if (!board) return res.status(404).json({ message: 'Board not found or access denied' });

    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};