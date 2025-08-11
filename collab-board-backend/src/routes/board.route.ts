import { Router } from 'express';
import { createBoard, getBoardById  } from '../controllers/board.controller';
import { requireAuth  } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create a new board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Marketing Campaign"
 *     responses:
 *       201:
 *         description: Board created
 */
router.post('/boards', requireAuth, createBoard);

/**
 * @swagger
 * /boards/{id}:
 *   get:
 *     summary: Get a board by ID
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The board ID
 *     responses:
 *       200:
 *         description: Board retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Board not found or access denied
 */
router.get('/boards/:id', requireAuth, getBoardById);

export default router;
