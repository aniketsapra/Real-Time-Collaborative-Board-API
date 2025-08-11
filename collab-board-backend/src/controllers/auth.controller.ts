import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { AuthRequest } from '../middlewares/auth.middleware';


export const register = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await registerUser(name, email, password);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
