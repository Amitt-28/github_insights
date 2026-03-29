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
  let commits = [];
  let page = 1;
  const maxPages = 4; // Fetch up to 400 commits max
  while (page <= maxPages) {
    const response = await githubAPI.get(`/repos/${owner}/${repo}/commits`, {
      params: { per_page: 100, page }
    });
    commits = commits.concat(response.data);
    if (response.data.length < 100) break;
    page++;
  }
  return commits;
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
