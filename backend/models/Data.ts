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

const Data = mongoose.model<IData>('Data', dataSchema);

export default Data;