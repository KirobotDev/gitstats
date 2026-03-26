/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 * @throws {Error}
 */
async function fetchFromGitHub(endpoint) {
  const url = `${CONFIG.API_BASE}${endpoint}`;
  try {
    const response = await fetch(url, { headers: CONFIG.REQUEST_HEADERS });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed fetching ${url}:`, error);
    throw error;
  }
}

/**
 * @param {string} owner
 * @param {string} repo
 * @returns {Promise<Object>}
 */
async function getRepoStats(owner, repo) {
  return await fetchFromGitHub(`/repos/${owner}/${repo}`);
}

/**
 * @param {string} owner
 * @param {string} repo
 * @returns {Promise<Object>}
 */
async function getRepoLanguages(owner, repo) {
  return await fetchFromGitHub(`/repos/${owner}/${repo}/languages`);
}

/**
 * @param {string} owner
 * @param {string} repo
 * @returns {Promise<Array<Object>>}
 */
async function getRepoContributors(owner, repo) {
  return await fetchFromGitHub(`/repos/${owner}/${repo}/contributors?per_page=${CONFIG.MAX_CONTRIBUTORS}`);
}

/**
 * @param {string} owner
 * @param {string} repo
 * @returns {Promise<Array<number>>}
 */
async function getStarHistory(owner, repo) {
  const url = `${CONFIG.API_BASE}/repos/${owner}/${repo}/stargazers`;
  try {
    const response = await fetch(url, {
      headers: {
        ...CONFIG.REQUEST_HEADERS,
        Accept: 'application/vnd.github.v3.star+json'
      }
    });
    if (!response.ok) return [];
    
    const linkHeader = response.headers.get('Link');
    let totalPages = 1;
    if (linkHeader) {
      const match = linkHeader.match(/page=(\d+)>; rel="last"/);
      if (match) totalPages = parseInt(match[1], 10);
    }
    
    const starsData = await response.json();
    const history = starsData.map(star => new Date(star.starred_at).getTime());
    return history;
  } catch (error) {
    console.error('Star history fetch failed', error);
    return [];
  }
}

/**
 * @param {string} owner
 * @param {string} repo
 * @returns {Promise<Object>}
 */
async function getAllRepoData(owner, repo) {
  try {
    const [stats, languages, contributors] = await Promise.all([
      getRepoStats(owner, repo),
      getRepoLanguages(owner, repo),
      getRepoContributors(owner, repo)
    ]);
    return { stats, languages, contributors };
  } catch (error) {
    throw new Error('Failed to load repository data. Please check the URL.');
  }
}
