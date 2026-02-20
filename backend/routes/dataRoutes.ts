import express, { Router, Request, Response, NextFunction } from 'express';
import {
  getAllData,
  getDataById,
  getFilters,
  getStats
} from '../controllers/dataController';

const router: Router = express.Router();

// Debug middleware to log all requests
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Route accessed: ${req.method} ${req.path}`);
  next();
});

// @route   GET /api/data
// @desc    Get all data with optional filtering and pagination
// @access  Public
router.get('/', getAllData);

// IMPORTANT: Specific routes MUST come before parameterized routes
// @route   GET /api/data/filters
// @desc    Get unique values for dropdown filters
// @access  Public
router.get('/filters', (req: Request, res: Response) => {
  console.log('Filters route matched');
  getFilters(req, res);
});

// @route   GET /api/data/stats
// @desc    Get statistics and analytics
// @access  Public
router.get('/stats', (req: Request, res: Response) => {
  console.log('Stats route matched');
  getStats(req, res);
});

// @route   GET /api/data/:id
// @desc    Get data by ID (MUST be last among GET routes)
// @access  Public
router.get('/:id', (req: Request, res: Response) => {
  console.log(`ID route matched with id: ${req.params.id}`);
  getDataById(req, res);
});

export default router;