"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataController_1 = require("../controllers/dataController");
const router = express_1.default.Router();
router.use((req, res, next) => {
    console.log(`Route accessed: ${req.method} ${req.path}`);
    next();
});
router.get('/', dataController_1.getAllData);
router.get('/filters', (req, res) => {
    console.log('Filters route matched');
    (0, dataController_1.getFilters)(req, res);
});
router.get('/stats', (req, res) => {
    console.log('Stats route matched');
    (0, dataController_1.getStats)(req, res);
});
router.get('/:id', (req, res) => {
    console.log(`ID route matched with id: ${req.params.id}`);
    (0, dataController_1.getDataById)(req, res);
});
exports.default = router;
//# sourceMappingURL=dataRoutes.js.map