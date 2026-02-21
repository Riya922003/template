import express, { Request, Response, Router } from 'express';

// Import route modules
import dataRoutes from './dataRoutes';
import analyticsRoutes from './analyticsRoutes';

const router: Router = express.Router();

// Health check route
router.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Blackcoffer API Server is running!',
    status: 'success',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Route definitions
router.use('/api/data', dataRoutes);
router.use('/api/analytics', analyticsRoutes);

export default router;