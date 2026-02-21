import express, { Router } from 'express';
import {
  getKPIData,
  getTopicsData,
  getYearsData,
  getSectorsData,
  getRegionsData,
  getPestleData,
  getCountriesData,
  getScatterData,
  getCitiesData
} from '../controllers/analyticsController';

const router: Router = express.Router();

// @route   GET /api/analytics/kpi
// @desc    Get Key Performance Indicators
// @access  Public
router.get('/kpi', getKPIData);

// @route   GET /api/analytics/topics
// @desc    Get topics analysis data
// @access  Public
router.get('/topics', getTopicsData);

// @route   GET /api/analytics/years
// @desc    Get year-wise analysis data
// @access  Public
router.get('/years', getYearsData);

// @route   GET /api/analytics/sectors
// @desc    Get sectors analysis data
// @access  Public
router.get('/sectors', getSectorsData);

// @route   GET /api/analytics/regions
// @desc    Get regions analysis data
// @access  Public
router.get('/regions', getRegionsData);

// @route   GET /api/analytics/pestle
// @desc    Get PESTLE analysis data
// @access  Public
router.get('/pestle', getPestleData);

// @route   GET /api/analytics/countries
// @desc    Get countries analysis data
// @access  Public
router.get('/countries', getCountriesData);

// @route   GET /api/analytics/scatter
// @desc    Get scatter plot data (Likelihood vs Relevance)
// @access  Public
router.get('/scatter', getScatterData);

// @route   GET /api/analytics/cities
// @desc    Get cities analysis data
// @access  Public
router.get('/cities', getCitiesData);

export default router;