import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience {
  role: string;
  company: string;
  period: string;
}

export interface IProfile extends Document {
  name: string;
  title: string;
  email: string;
  phone: string;
  department: string;
  location: string;
  bio: string;
  skills: string[];
  experience: IExperience[];
  companyImage?: string;
}

const ExperienceSchema: Schema = new Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
});

const ProfileSchema: Schema = new Schema({
  name: { type: String, required: true },
  title: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  department: { type: String },
  location: { type: String },
  bio: { type: String },
  skills: { type: [String], default: [] },
  experience: { type: [ExperienceSchema], default: [] },
  companyImage: { type: String },
});

export default mongoose.model<IProfile>('Profile', ProfileSchema);