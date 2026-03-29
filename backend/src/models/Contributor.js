const mongoose = require('mongoose');

const contributorSchema = new mongoose.Schema({
  repoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Repository',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
  },
  totalCommits: {
    type: Number,
    default: 0,
  },
  overallImpactScore: {
    type: Number,
    default: 0,
  },
  contributionFlag: {
    type: String,
    enum: ['high-impact', 'low-impact', 'uneven', 'normal'],
    default: 'normal'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contributor', contributorSchema);
