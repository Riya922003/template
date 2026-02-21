"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Data_1 = __importDefault(require("../models/Data"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const importData = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully!');
        console.log('Reading JSON data...');
        const jsonPath = path.join(__dirname, '..', 'jsondata.json');
        const jsonData = fs.readFileSync(jsonPath, 'utf-8');
        const data = JSON.parse(jsonData);
        console.log(`Found ${data.length} records to import`);
        console.log('Clearing existing data...');
        await Data_1.default.deleteMany({});
        const batchSize = 100;
        let imported = 0;
        for (let i = 0; i < data.length; i += batchSize) {
            const batch = data.slice(i, i + batchSize);
            await Data_1.default.insertMany(batch);
            imported += batch.length;
            console.log(`Imported ${imported}/${data.length} records`);
        }
        console.log('Data import completed successfully!');
        const count = await Data_1.default.countDocuments();
        console.log(`Total records in database: ${count}`);
    }
    catch (error) {
        console.error('Error during import:', error);
    }
    finally {
        await mongoose_1.default.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    }
};
importData();
//# sourceMappingURL=import.js.map