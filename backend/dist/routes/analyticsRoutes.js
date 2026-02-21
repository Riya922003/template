"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analyticsController_1 = require("../controllers/analyticsController");
const router = express_1.default.Router();
router.get('/kpi', analyticsController_1.getKPIData);
router.get('/topics', analyticsController_1.getTopicsData);
router.get('/years', analyticsController_1.getYearsData);
router.get('/sectors', analyticsController_1.getSectorsData);
router.get('/regions', analyticsController_1.getRegionsData);
router.get('/pestle', analyticsController_1.getPestleData);
router.get('/countries', analyticsController_1.getCountriesData);
router.get('/scatter', analyticsController_1.getScatterData);
router.get('/cities', analyticsController_1.getCitiesData);
exports.default = router;
//# sourceMappingURL=analyticsRoutes.js.map