import mongoose, { Document, Schema } from 'mongoose';

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

const dataSchema: Schema<IData> = new mongoose.Schema({
  end_year: {
    type: String,
    default: ""
  },
  intensity: {
    type: Number,
    // required: true
  },
  sector: {
    type: String,
    default: ""
  },
  topic: {
    type: String,
    default: ""
  },
  insight: {
    type: String,
    default: ""
  },
  url: {
    type: String,
    default: ""
  },
  region: {
    type: String,
    default: ""
  },
  start_year: {
    type: String,
    default: ""
  },
  impact: {
    type: String,
    default: ""
  },
  added: {
    type: String,
    // required: true
  },
  published: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: ""
  },
  relevance: {
    type: Number,
    // required: true
  },
  pestle: {
    type: String,
    default: ""
  },
  source: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    // required: true
  },
  likelihood: {
    type: Number,
    // required: true
  }
}, {
  timestamps: true
});

const Data = mongoose.model<IData>('Data', dataSchema);

export default Data;