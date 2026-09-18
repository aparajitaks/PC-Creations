const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  durationSeconds: { type: Number, default: 300 },
  videoUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  isFreePreview: { type: Boolean, default: false },
  resources: [{
    title: { type: String },
    type: { type: String, default: 'link' },
    url: { type: String }
  }]
});

const ModuleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  lessons: [LessonSchema]
});

const CourseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  tagline: { type: String, required: true },
  badge: { type: String, default: 'Masterclass' },
  category: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'], default: 'All Levels' },
  duration: { type: String, required: true },
  totalLessons: { type: Number, default: 0 },
  totalHours: { type: String, default: '' },
  rating: { type: Number, default: 4.9 },
  ratingCount: { type: Number, default: 120 },
  instructor: {
    name: { type: String, required: true },
    title: { type: String, default: 'Senior Growth Strategist' },
    company: { type: String, default: 'PC Creations' },
    avatar: { type: String, default: '' }
  },
  thumbnail: { type: String, default: '' },
  banner: { type: String, default: '' },
  summary: { type: String, required: true },
  learningOutcomes: [{ type: String }],
  prerequisites: [{ type: String }],
  modules: [ModuleSchema],
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
