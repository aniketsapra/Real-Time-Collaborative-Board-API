import express from 'express';
import { createColumn } from '../controllers/column.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Column:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *         order:
 *           type: integer
 *         boardId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - title
 *         - order
 *         - boardId

 * /boards/{boardId}/columns:
 *   post:
 *     summary: Create a column in a board
 *     tags: [Columns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the board
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               order:
 *                 type: integer
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Column created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Column'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post('/boards/:boardId/columns', requireAuth, createColumn);

export default router;
