import { Request, Response } from 'express';
import UserService from '../services/userService';
import { httpLogger } from '../middlewares/logger';

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;

  try {
    const user = await UserService.createUser(firstName, lastName, email);
    httpLogger.info('User created successfully', { user });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      httpLogger.error(error.message, { email });
      res.status(400).json({ message: error.message });
    } else {
      httpLogger.error('An unknown error occurred', { email });
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      httpLogger.error('User not found', { email });
      return res.status(404).json({ message: 'User not found' });
    }
    httpLogger.info('User retrieved successfully', { user });
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      httpLogger.error(error.message, { email });
      res.status(500).json({ message: error.message });
    } else {
      httpLogger.error('An unknown error occurred', { email });
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { newEmail } = req.body;

  if (!email || !newEmail) {
    const errorMessage = 'Missing required fields';
    httpLogger.error(errorMessage, { email, newEmail });
    return res.status(400).json({ message: errorMessage });
  }

  if (email === newEmail) {
    const errorMessage = 'Emails are the same';
    httpLogger.error(errorMessage, { email, newEmail });
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const user = await UserService.updateUser(email, newEmail);
    httpLogger.info('User updated successfully', { user });
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = `Error updating user: ${error.message}`;
      httpLogger.error(errorMessage, { email, newEmail });
      res.status(400).json({ message: errorMessage });
    } else {
      const errorMessage = 'An unknown error occurred while updating user';
      httpLogger.error(errorMessage, { email, newEmail });
      res.status(500).json({ message: errorMessage });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { email } = req.params;

  if (!email) {
    const errorMessage = 'Missing required fields';
    httpLogger.error(errorMessage, { email });
    return res.status(400).json({ message: errorMessage });
  }

  try {
    await UserService.deleteUser(email);
    httpLogger.info('User deleted successfully', { email });
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      httpLogger.error(error.message, { email });
      res.status(400).json({ message: error.message });
    } else {
      httpLogger.error('An unknown error occurred', { email });
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};