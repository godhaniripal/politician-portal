import mongoose, { Schema } from 'mongoose';

const WorkSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  completionDate: { type: Date, required: true },
  inaugurationDate: { type: Date },
  category: { type: String, required: true },
  photoUrl: { type: String, required: true },
  politicianName: { type: String, required: true },
  constituency: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  approvedBy: { type: String },
  approvedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const Work = mongoose.models.Work || mongoose.model('Work', WorkSchema);

export default Work;
