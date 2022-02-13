import * as mongoose from 'mongoose';
export const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  description: { type: String },
  color: { type: String },
});

export interface Event extends mongoose.Document {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  color: string;
}
