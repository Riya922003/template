"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataRoutes_1 = __importDefault(require("./dataRoutes"));
const analyticsRoutes_1 = __importDefault(require("./analyticsRoutes"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({
        message: 'Blackcoffer API Server is running!',
        status: 'success',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});
router.use('/api/data', dataRoutes_1.default);
router.use('/api/analytics', analyticsRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map