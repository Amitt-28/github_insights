const axios = require('axios');

const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    // Authorization: process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : undefined,
  },
});

exports.getRepoDetails = async (owner, repo) => {
  const response = await githubAPI.get(`/repos/${owner}/${repo}`);
  return response.data;
};

exports.getContributors = async (owner, repo) => {
  const response = await githubAPI.get(`/repos/${owner}/${repo}/contributors`);
  return response.data;
};

exports.getCommits = async (owner, repo) => {
  const response = await githubAPI.get(`/repos/${owner}/${repo}/commits`);
  return response.data;
};

exports.getCommitDiff = async (owner, repo, sha) => {
  try {
    const response = await githubAPI.get(`/repos/${owner}/${repo}/commits/${sha}`, {
      headers: { Accept: 'application/vnd.github.v3.diff' }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching diff for ${sha}:`, error.message);
    return "";
  }
};
