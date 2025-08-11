import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateCardParams {
  columnId: string;
  title: string;
  description?: string;
  userId?: string;
  io?: any;
}

export const createCardService = async ({ columnId, title, description, userId, io }: CreateCardParams) => {
  const column = await prisma.column.findUnique({
    where: { id: columnId },
    include: { board: { include: { members: true } } },
  });

  if (!column) {
    throw new Error('Column not found');
  }

  const isAuthorized =
    column.board.ownerId === userId ||
    column.board.members.some((member) => member.userId === userId);

  if (!isAuthorized) {
    throw new Error('Forbidden');
  }

  // Get current max order in column
  const lastCard = await prisma.card.findFirst({
    where: { columnId },
    orderBy: { order: 'desc' },
  });

  const nextOrder = lastCard ? lastCard.order + 1 : 1;

  const card = await prisma.card.create({
    data: {
      title,
      description,
      order: nextOrder,
      columnId,
    },
  });

  // Broadcast card_created event to all clients in the board room
  io?.to(column.boardId).emit('card_created', { card });

  return card;
};
