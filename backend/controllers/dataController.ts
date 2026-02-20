import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Data from '../models/Data';

// Get all data with optional filtering and pagination
export const getAllData = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      sector,
      topic,
      region,
      country,
      source,
      pestle,
      limit = 100,
      page = 1
    } = req.query;

    // Build filter object
    const filter: any = {};
    if (sector) filter.sector = { $regex: sector, $options: 'i' };
    if (topic) filter.topic = { $regex: topic, $options: 'i' };
    if (region) filter.region = { $regex: region, $options: 'i' };
    if (country) filter.country = { $regex: country, $options: 'i' };
    if (source) filter.source = { $regex: source, $options: 'i' };
    if (pestle) filter.pestle = { $regex: pestle, $options: 'i' };

    // Calculate pagination
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    // Get data with filters and pagination
    const data = await Data.find(filter)
      .limit(parseInt(limit as string))
      .skip(skip)
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const total = await Data.countDocuments(filter);

    res.json({
      success: true,
      data,
      pagination: {
        current_page: parseInt(page as string),
        per_page: parseInt(limit as string),
        total_records: total,
        total_pages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error: any) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching data',
      error: error.message
    });
  }
};

// Get data by ID
export const getDataById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
      return;
    }

    const data = await Data.findById(id);
    
    if (!data) {
      res.status(404).json({
        success: false,
        message: 'Data not found'
      });
      return;
    }

    res.json({
      success: true,
      data
    });
  } catch (error: any) {
    console.error('Error fetching data by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching data',
      error: error.message
    });
  }
};

// Get unique values for filters
export const getFilters = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('getFilters function called'); // Debug log
    
    const [sectors, topics, regions, countries, sources, pestles] = await Promise.all([
      Data.distinct('sector').then(arr => arr.filter(item => item && item.trim() !== '')),
      Data.distinct('topic').then(arr => arr.filter(item => item && item.trim() !== '')),
      Data.distinct('region').then(arr => arr.filter(item => item && item.trim() !== '')),
      Data.distinct('country').then(arr => arr.filter(item => item && item.trim() !== '')),
      Data.distinct('source').then(arr => arr.filter(item => item && item.trim() !== '')),
      Data.distinct('pestle').then(arr => arr.filter(item => item && item.trim() !== ''))
    ]);

    res.json({
      success: true,
      filters: {
        sectors: sectors.sort(),
        topics: topics.sort(),
        regions: regions.sort(),
        countries: countries.sort(),
        sources: sources.sort(),
        pestles: pestles.sort()
      }
    });
  } catch (error: any) {
    console.error('Error fetching filters:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching filter options',
      error: error.message
    });
  }
};

// Get statistics/analytics
export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('getStats function called'); // Debug log
    
    const [
      totalRecords,
      avgIntensity,
      avgLikelihood,
      avgRelevance,
      sectorStats,
      topicStats
    ] = await Promise.all([
      Data.countDocuments(),
      Data.aggregate([{ $group: { _id: null, avg: { $avg: '$intensity' } } }]),
      Data.aggregate([{ $group: { _id: null, avg: { $avg: '$likelihood' } } }]),
      Data.aggregate([{ $group: { _id: null, avg: { $avg: '$relevance' } } }]),
      Data.aggregate([
        { $match: { sector: { $ne: '' } } },
        { $group: { _id: '$sector', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      Data.aggregate([
        { $match: { topic: { $ne: '' } } },
        { $group: { _id: '$topic', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ])
    ]);

    res.json({
      success: true,
      stats: {
        total_records: totalRecords,
        averages: {
          intensity: avgIntensity[0]?.avg || 0,
          likelihood: avgLikelihood[0]?.avg || 0,
          relevance: avgRelevance[0]?.avg || 0
        },
        top_sectors: sectorStats,
        top_topics: topicStats
      }
    });
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};