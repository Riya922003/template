"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCitiesData = exports.getScatterData = exports.getCountriesData = exports.getPestleData = exports.getRegionsData = exports.getSectorsData = exports.getYearsData = exports.getTopicsData = exports.getKPIData = void 0;
const Data_1 = __importDefault(require("../models/Data"));
const buildMatch = (req) => {
    const { topic, sector, region, country, pestle, source, end_year, city } = req.query;
    const match = {};
    if (topic)
        match.topic = topic;
    if (sector)
        match.sector = sector;
    if (region)
        match.region = region;
    if (country)
        match.country = country;
    if (pestle)
        match.pestle = pestle;
    if (source)
        match.source = source;
    if (end_year)
        match.end_year = end_year;
    if (city)
        match.city = city;
    return match;
};
const getKPIData = async (req, res) => {
    try {
        const match = buildMatch(req);
        const [totalInsights, avgStats] = await Promise.all([
            Data_1.default.countDocuments(match),
            Data_1.default.aggregate([
                { $match: match },
                {
                    $group: {
                        _id: null,
                        avgIntensity: { $avg: '$intensity' },
                        avgLikelihood: { $avg: '$likelihood' },
                        avgRelevance: { $avg: '$relevance' }
                    }
                }
            ])
        ]);
        res.json({
            success: true,
            data: {
                totalInsights,
                avgIntensity: Math.round((avgStats[0]?.avgIntensity || 0) * 10) / 10,
                avgLikelihood: Math.round((avgStats[0]?.avgLikelihood || 0) * 10) / 10,
                avgRelevance: Math.round((avgStats[0]?.avgRelevance || 0) * 10) / 10
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching KPI data', error: error.message });
    }
};
exports.getKPIData = getKPIData;
const getTopicsData = async (req, res) => {
    try {
        const match = buildMatch(req);
        const topicsData = await Data_1.default.aggregate([
            { $match: { ...match, topic: { $ne: '', $exists: true } } },
            {
                $group: {
                    _id: '$topic',
                    avgIntensity: { $avg: '$intensity' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { avgIntensity: -1 } },
            { $limit: 10 }
        ]);
        res.json({
            success: true,
            data: topicsData.map(item => ({
                topic: item._id,
                avgIntensity: Math.round(item.avgIntensity * 10) / 10,
                count: item.count
            }))
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching topics data', error: error.message });
    }
};
exports.getTopicsData = getTopicsData;
const getYearsData = async (req, res) => {
    try {
        const match = buildMatch(req);
        const yearsData = await Data_1.default.aggregate([
            { $match: { ...match, end_year: { $ne: '', $exists: true } } },
            {
                $group: {
                    _id: '$end_year',
                    count: { $sum: 1 },
                    avgIntensity: { $avg: '$intensity' }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.json({
            success: true,
            data: yearsData.map(item => ({
                year: item._id,
                count: item.count,
                avgIntensity: Math.round(item.avgIntensity * 10) / 10
            }))
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching years data', error: error.message });
    }
};
exports.getYearsData = getYearsData;
const getSectorsData = async (req, res) => {
    try {
        const match = buildMatch(req);
        const sectorsData = await Data_1.default.aggregate([
            { $match: { ...match, sector: { $ne: '', $exists: true } } },
            {
                $group: {
                    _id: '$sector',
                    count: { $sum: 1 },
                    avgIntensity: { $avg: '$intensity' }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        res.json({
            success: true,
            data: sectorsData.map(item => ({
                sector: item._id,
                count: item.count,
                avgIntensity: Math.round(item.avgIntensity * 10) / 10
            }))
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching sectors data', error: error.message });
    }
};
exports.getSectorsData = getSectorsData;
const getRegionsData = async (req, res) => {
    try {
        const match = buildMatch(req);
        const regionsData = await Data_1.default.aggregate([
            { $match: { ...match, region: { $ne: '', $exists: true } } },
            {
                $group: {
                    _id: '$region',
                    count: { $sum: 1 },
                    avgLikelihood: { $avg: '$likelihood' }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        res.json({
            success: true,
            data: regionsData.map(item => ({
                region: item._id,
                count: item.count,
                avgLikelihood: Math.round(item.avgLikelihood * 10) / 10
            }))
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching regions data', error: error.message });
    }
};
exports.getRegionsData = getRegionsData;
const getPestleData = async (req, res) => {
    try {
        const match = buildMatch(req);
        const pestleData = await Data_1.default.aggregate([
            { $match: { ...match, pestle: { $ne: '', $exists: true } } },
            {
                $group: {
                    _id: '$pestle',
                    count: { $sum: 1 },
                    avgIntensity: { $avg: '$intensity' }
                }
            },
            { $sort: { count: -1 } }
        ]);
        res.json({
            success: true,
            data: pestleData.map(item => ({
                pestle: item._id,
                count: item.count,
                avgIntensity: Math.round(item.avgIntensity * 10) / 10
            }))
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching PESTLE data', error: error.message });
    }
};
exports.getPestleData = getPestleData;
const getCountriesData = async (req, res) => {
    try {
        const match = buildMatch(req);
        const countriesData = await Data_1.default.aggregate([
            { $match: { ...match, country: { $ne: '', $exists: true } } },
            {
                $group: {
                    _id: '$country',
                    count: { $sum: 1 },
                    avgIntensity: { $avg: '$intensity' }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 15 }
        ]);
        res.json({
            success: true,
            data: countriesData.map(item => ({
                country: item._id,
                count: item.count,
                avgIntensity: Math.round(item.avgIntensity * 10) / 10
            }))
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching countries data', error: error.message });
    }
};
exports.getCountriesData = getCountriesData;
const getScatterData = async (req, res) => {
    try {
        const match = buildMatch(req);
        const scatterData = await Data_1.default.aggregate([
            {
                $match: {
                    ...match,
                    likelihood: { $gt: 0 },
                    relevance: { $gt: 0 }
                }
            },
            {
                $project: {
                    likelihood: 1,
                    relevance: 1,
                    intensity: 1,
                    sector: 1,
                    topic: 1
                }
            },
            { $limit: 100 }
        ]);
        res.json({
            success: true,
            data: scatterData.map(item => ({
                x: item.relevance,
                y: item.likelihood,
                intensity: item.intensity,
                sector: item.sector,
                topic: item.topic
            }))
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching scatter data', error: error.message });
    }
};
exports.getScatterData = getScatterData;
const getCitiesData = async (req, res) => {
    try {
        const match = buildMatch(req);
        const citiesData = await Data_1.default.aggregate([
            { $match: { ...match, city: { $ne: '', $exists: true } } },
            {
                $group: {
                    _id: '$city',
                    count: { $sum: 1 },
                    avgIntensity: { $avg: '$intensity' }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        res.json({
            success: true,
            data: citiesData.map(item => ({
                city: item._id,
                count: item.count,
                avgIntensity: Math.round(item.avgIntensity * 10) / 10
            }))
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching cities data', error: error.message });
    }
};
exports.getCitiesData = getCitiesData;
//# sourceMappingURL=analyticsController.js.map