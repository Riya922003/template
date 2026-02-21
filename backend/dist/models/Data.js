"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dataSchema = new mongoose_1.default.Schema({
    end_year: {
        type: String,
        required: false,
        default: ""
    },
    intensity: {
        type: Number,
        required: false,
        default: 0
    },
    sector: {
        type: String,
        required: false,
        default: ""
    },
    topic: {
        type: String,
        required: false,
        default: ""
    },
    insight: {
        type: String,
        required: false,
        default: ""
    },
    url: {
        type: String,
        required: false,
        default: ""
    },
    region: {
        type: String,
        required: false,
        default: ""
    },
    start_year: {
        type: String,
        required: false,
        default: ""
    },
    impact: {
        type: String,
        required: false,
        default: ""
    },
    added: {
        type: String,
        required: false,
        default: () => new Date().toISOString()
    },
    published: {
        type: String,
        required: false,
        default: ""
    },
    country: {
        type: String,
        required: false,
        default: ""
    },
    relevance: {
        type: Number,
        required: false,
        default: 0
    },
    pestle: {
        type: String,
        required: false,
        default: ""
    },
    source: {
        type: String,
        required: false,
        default: ""
    },
    title: {
        type: String,
        required: false,
        default: "Untitled"
    },
    likelihood: {
        type: Number,
        required: false,
        default: 0
    }
}, {
    timestamps: true
});
const Data = mongoose_1.default.model('Data', dataSchema);
exports.default = Data;
//# sourceMappingURL=Data.js.map