import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createBoardService = async (title: string, userId: string) => {
  return prisma.board.create({
    data: {
      title,
      ownerId: userId,
      members: {
        create: {
          userId,
        },
      },
    },
    include: {
      members: true,
    },
  });
};

export const createBoard = async (title: string, ownerId: string) => {
  return await prisma.board.create({
    data: {
      title,
      ownerId,
      members: {
        create: {
          userId: ownerId,
        },
      },
    },
    include: {
      members: true,
    },
  });
};

export const getUserBoards = async (userId: string) => {
  const ownedBoards = await prisma.board.findMany({
    where: { ownerId: userId },
    include: { members: true, columns: true },
  });

  const memberBoards = await prisma.board.findMany({
    where: {
      members: {
        some: {
          userId: userId,
        },
      },
    },
    include: { members: true, columns: true },
  });

  return { ownedBoards, memberBoards };
};
