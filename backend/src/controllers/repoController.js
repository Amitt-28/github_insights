const Repository = require('../models/Repository');
const Contributor = require('../models/Contributor');
const Commit = require('../models/Commit');
const githubService = require('../services/githubService');
const geminiService = require('../services/geminiService');

const analyzeRepo = async (req, res) => {
  const { url } = req.body;
  const userId = req.user._id;

  try {
    // Extract owner and repo from URL
    const urlParts = url.split('/').filter(Boolean); // remove empty strings
    const name = urlParts.pop();
    let owner = urlParts.pop();
    
    // Fallback if URL is invalid
    if(!owner || !name) {
      return res.status(400).json({ message: 'Invalid GitHub URL provided' });
    }

    let repo = await Repository.findOne({ url, uploadedBy: userId });
    
    if (!repo) {
      repo = await Repository.create({
        url, owner, name, uploadedBy: userId, status: 'analyzing'
      });
    } else {
      repo.status = 'analyzing';
      await repo.save();
    }

    res.status(202).json({ message: 'Analysis started', repoId: repo._id });

    // Background Processing
    processRepoData(repo, owner, name).catch(console.error);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const processRepoData = async (repo, owner, name) => {
  try {
    const ghRepo = await githubService.getRepoDetails(owner, name);
    const ghContributors = await githubService.getContributors(owner, name);
    const ghCommits = await githubService.getCommits(owner, name);

    // Save Contributors
    for (const c of ghContributors) {
      await Contributor.findOneAndUpdate(
        { repoId: repo._id, username: c.login },
        { avatarUrl: c.avatar_url, totalCommits: c.contributions },
        { upsert: true, new: true }
      );
    }

    // Process Commits & run Gemini Analysis
    let commitInfoText = "";
    
    // Process top 10 commits to avoid passing Gemini free tier rate limits for MVP
    const commitsToProcess = ghCommits.slice(0, 10);
    
    for (const ghCommit of commitsToProcess) {
      const sha = ghCommit.sha;
      const message = ghCommit.commit.message;
      const author = ghCommit.commit.author?.name || ghCommit.commit.committer?.name || "Unknown";
      const date = ghCommit.commit.author?.date;

      commitInfoText += `\n- ${author}: ${message}`;

      const diff = await githubService.getCommitDiff(owner, name, sha);
      const aiAnalysis = await geminiService.analyzeCommit(message, diff);

      await Commit.findOneAndUpdate(
        { repoId: repo._id, sha: sha },
        {
          author, 
          date, 
          message,
          classification: aiAnalysis.classification,
          impactScore: aiAnalysis.impactScore,
          summary: aiAnalysis.summary
        },
        { upsert: true }
      );
    }

    // Generate Repo Summary
    const repoSummary = await geminiService.summarizeRepo(commitInfoText);

    // Update Repo Status with some heuristic defaults for MVP
    repo.summary = repoSummary;
    repo.status = 'completed';
    repo.healthScore = 85; // Heuristic placeholder
    repo.busFactor = 2; // Heuristic placeholder
    repo.lastAnalyzed = Date.now();
    await repo.save();

  } catch (err) {
    console.error('Error in background processing:', err);
    repo.status = 'failed';
    await repo.save();
  }
};

const getRepoById = async (req, res) => {
  try {
    const repo = await Repository.findOne({ _id: req.params.id, uploadedBy: req.user._id });
    if (!repo) {
       return res.status(404).json({ message: 'Repository not found or access denied' });
    }

    const contributors = await Contributor.find({ repoId: repo._id });
    const commits = await Commit.find({ repoId: repo._id }).sort({ date: -1 });

    res.json({
      repository: repo,
      contributors,
      commits
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserRepos = async (req, res) => {
   try {
     const repos = await Repository.find({ uploadedBy: req.user._id });
     res.json(repos);
   } catch(error) {
     res.status(500).json({ message: error.message });
   }
};

module.exports = { analyzeRepo, getRepoById, getUserRepos };
