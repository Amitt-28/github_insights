const mongoose = require('mongoose');

const repositorySchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'analyzing', 'completed', 'failed'],
    default: 'pending'
  },
  healthScore: {
    type: Number,
    default: 0
  },
  busFactor: {
    type: Number,
    default: 0
  },
  summary: {
    type: String,
  },
  lastAnalyzed: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Repository', repositorySchema);
