const mongoose = require('mongoose');

const commitSchema = new mongoose.Schema({
  repoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Repository',
    required: true,
  },
  sha: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  classification: {
    type: String,
  },
  impactScore: {
    type: Number,
  },
  summary: {
    type: String 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Commit', commitSchema);
