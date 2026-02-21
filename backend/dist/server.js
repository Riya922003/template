"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '5000');
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB successfully!');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
app.use('/', routes_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API endpoints available at:`);
    console.log(`- GET http://localhost:${PORT}/`);
    console.log(`- GET http://localhost:${PORT}/api/data`);
    console.log(`- GET http://localhost:${PORT}/api/data/:id`);
    console.log(`- GET http://localhost:${PORT}/api/data/filters`);
    console.log(`- GET http://localhost:${PORT}/api/data/stats`);
});
exports.default = app;
//# sourceMappingURL=server.js.map