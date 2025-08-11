// services/column.service.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createColumnService = async (boardId: string, userId: string, title: string) => {
  // 1. Check if board exists and user is a member or owner
  const board = await prisma.board.findUnique({
    where: { id: boardId },
    include: {
      members: true,
      owner: true,
    },
  });

  if (!board) throw new Error('Board not found');

  const isOwner = board.ownerId === userId;
  const isMember = board.members.some((m) => m.userId === userId);

  if (!isOwner && !isMember) {
    const err: any = new Error('Access denied to this board');
    err.statusCode = 403;
    throw err;
  }

  // 2. Find current max order
  const existingColumns = await prisma.column.findMany({
    where: { boardId },
    orderBy: { order: 'desc' },
    take: 1,
  });

  const nextOrder = existingColumns.length > 0 ? existingColumns[0].order + 1 : 1;

  // 3. Create column
  const column = await prisma.column.create({
    data: {
      title,
      order: nextOrder,
      boardId,
    },
  });

  return column;
};
