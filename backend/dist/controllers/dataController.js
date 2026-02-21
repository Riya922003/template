"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.getFilters = exports.getDataById = exports.getAllData = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Data_1 = __importDefault(require("../models/Data"));
const getAllData = async (req, res) => {
    try {
        const { sector, topic, region, country, source, pestle, limit = 100, page = 1 } = req.query;
        const filter = {};
        if (sector)
            filter.sector = { $regex: sector, $options: 'i' };
        if (topic)
            filter.topic = { $regex: topic, $options: 'i' };
        if (region)
            filter.region = { $regex: region, $options: 'i' };
        if (country)
            filter.country = { $regex: country, $options: 'i' };
        if (source)
            filter.source = { $regex: source, $options: 'i' };
        if (pestle)
            filter.pestle = { $regex: pestle, $options: 'i' };
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const data = await Data_1.default.find(filter)
            .limit(parseInt(limit))
            .skip(skip)
            .sort({ createdAt: -1 });
        const total = await Data_1.default.countDocuments(filter);
        res.json({
            success: true,
            data,
            pagination: {
                current_page: parseInt(page),
                per_page: parseInt(limit),
                total_records: total,
                total_pages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching data',
            error: error.message
        });
    }
};
exports.getAllData = getAllData;
const getDataById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
            return;
        }
        const data = await Data_1.default.findById(id);
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
    }
    catch (error) {
        console.error('Error fetching data by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching data',
            error: error.message
        });
    }
};
exports.getDataById = getDataById;
const getFilters = async (req, res) => {
    try {
        console.log('getFilters function called');
        const [sectors, topics, regions, countries, sources, pestles] = await Promise.all([
            Data_1.default.distinct('sector').then(arr => arr.filter(item => item && item.trim() !== '')),
            Data_1.default.distinct('topic').then(arr => arr.filter(item => item && item.trim() !== '')),
            Data_1.default.distinct('region').then(arr => arr.filter(item => item && item.trim() !== '')),
            Data_1.default.distinct('country').then(arr => arr.filter(item => item && item.trim() !== '')),
            Data_1.default.distinct('source').then(arr => arr.filter(item => item && item.trim() !== '')),
            Data_1.default.distinct('pestle').then(arr => arr.filter(item => item && item.trim() !== ''))
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
    }
    catch (error) {
        console.error('Error fetching filters:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching filter options',
            error: error.message
        });
    }
};
exports.getFilters = getFilters;
const getStats = async (req, res) => {
    try {
        console.log('getStats function called');
        const [totalRecords, avgIntensity, avgLikelihood, avgRelevance, sectorStats, topicStats] = await Promise.all([
            Data_1.default.countDocuments(),
            Data_1.default.aggregate([{ $group: { _id: null, avg: { $avg: '$intensity' } } }]),
            Data_1.default.aggregate([{ $group: { _id: null, avg: { $avg: '$likelihood' } } }]),
            Data_1.default.aggregate([{ $group: { _id: null, avg: { $avg: '$relevance' } } }]),
            Data_1.default.aggregate([
                { $match: { sector: { $ne: '' } } },
                { $group: { _id: '$sector', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 }
            ]),
            Data_1.default.aggregate([
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
    }
    catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message
        });
    }
};
exports.getStats = getStats;
//# sourceMappingURL=dataController.js.map