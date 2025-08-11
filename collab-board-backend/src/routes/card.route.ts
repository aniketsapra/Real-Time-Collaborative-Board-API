import express from 'express';
import { createCard } from '../controllers/card.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/cards/columns/{columnId}/cards:
 *   post:
 *     summary: Create a new card in a column
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: Column ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Card created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/columns/:columnId/cards', requireAuth, createCard);

export default router;
