import express from 'express';
import authRoutes from './routes/auth.route';
import boardRoutes from './routes/board.route';
import { swaggerUi, swaggerSpec } from './utils/swagger';
import columnRoutes from "./routes/column.route";
import cardRoutes from './routes/card.route'

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use('/', boardRoutes);
app.use("/", columnRoutes);
app.use('/', cardRoutes);

export default app;
