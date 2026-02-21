import mongoose, { Document } from 'mongoose';
export interface IData extends Document {
    end_year: string;
    intensity: number;
    sector: string;
    topic: string;
    insight: string;
    url: string;
    region: string;
    start_year: string;
    impact: string;
    added: string;
    published: string;
    country: string;
    relevance: number;
    pestle: string;
    source: string;
    title: string;
    likelihood: number;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const Data: mongoose.Model<IData, {}, {}, {}, mongoose.Document<unknown, {}, IData, {}, mongoose.DefaultSchemaOptions> & IData & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IData>;
export default Data;
//# sourceMappingURL=Data.d.ts.map