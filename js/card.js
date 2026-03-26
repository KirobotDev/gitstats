/**
 * @param {HTMLElement} container
 * @param {Object} data 
 */
function renderCard(container, data) {
  if (!container || !data) return;

  const { stats, languages, contributors } = data;

  const title = container.querySelector('.repo-title');
  if (title) {
    title.textContent = '';
    
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "octicon");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("aria-hidden", "true");
    
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute("d", "M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z");
    svg.appendChild(path);

    const a = document.createElement('a');
    a.href = stats.html_url || '#';
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = stats.full_name || 'unknown/repo';

    title.appendChild(svg);
    title.appendChild(a);
  }

  const desc = container.querySelector('.repo-description');
  if (desc) desc.textContent = stats.description || 'No description provided.';

  const statStars = container.querySelector('#stat-stars');
  const statForks = container.querySelector('#stat-forks');
  const statWatchers = container.querySelector('#stat-watchers');
  const statIssues = container.querySelector('#stat-issues');

  if (statStars) statStars.textContent = _formatNumber(stats.stargazers_count);
  if (statForks) statForks.textContent = _formatNumber(stats.forks_count);
  if (statWatchers) statWatchers.textContent = _formatNumber(stats.subscribers_count || stats.watchers_count);
  if (statIssues) statIssues.textContent = _formatNumber(stats.open_issues_count);

  _renderLanguagePills(container.querySelector('.language-pills'), languages);
  _renderTopics(container.querySelector('.topics-container'), stats.topics);
  _renderContributors(container.querySelector('.contributors-list'), contributors);

  const canvasPie = container.querySelector('#lang-pie-chart');
  if (canvasPie) renderLanguagePie(canvasPie, languages);

  const canvasGraph = container.querySelector('#stars-graph-chart');
  if (canvasGraph) renderStarsGraph(canvasGraph, stats);
}

/**
 * @param {HTMLElement} c
 * @param {Object} l
 */
function _renderLanguagePills(c, l) {
  if (!c || !l) return;
  c.textContent = '';
  
  const total = Object.values(l).reduce((a,b) => a+b, 0);
  const sorted = Object.entries(l).sort((a,b) => b[1] - a[1]).slice(0, CONFIG.MAX_LANGUAGES);

  sorted.forEach(([lang, bytes]) => {
    const pct = ((bytes / total) * 100).toFixed(1);
    const color = getLanguageColor(lang);
    const iconUrl = getLanguageIconUrl(lang);
    
    const div = document.createElement('div');
    div.className = 'lang-pill';
    div.style.borderColor = color;
    
    if (iconUrl) {
      const img = document.createElement('img');
      img.src = iconUrl;
      img.alt = lang;
      img.className = 'lang-icon';
      div.appendChild(img);
    } else {
      const dot = document.createElement('span');
      dot.className = 'lang-color-dot';
      dot.style.backgroundColor = color;
      div.appendChild(dot);
    }

    const nameSpan = document.createElement('span');
    nameSpan.className = 'lang-name';
    nameSpan.textContent = lang;
    div.appendChild(nameSpan);

    const pctSpan = document.createElement('span');
    pctSpan.className = 'lang-pct';
    pctSpan.style.color = color;
    pctSpan.textContent = `${pct}%`;
    div.appendChild(pctSpan);

    c.appendChild(div);
  });
}

/**
 * @param {HTMLElement} c
 * @param {Array<string>} t
 */
function _renderTopics(c, t) {
  if (!c || !t) return;
  c.textContent = '';
  t.slice(0, 5).forEach(topic => {
    const span = document.createElement('span');
    span.className = 'topic-chip';
    span.textContent = topic;
    c.appendChild(span);
  });
}

/**
 * @param {HTMLElement} c
 * @param {Array<Object>} ctr
 */
function _renderContributors(c, ctr) {
  if (!c || !ctr) return;
  c.textContent = '';
  ctr.forEach(u => {
    const a = document.createElement('a');
    a.href = u.html_url;
    a.target = '_blank';
    a.className = 'contrib-avatar';
    a.title = u.login;
    const img = document.createElement('img');
    img.src = u.avatar_url;
    img.alt = u.login;
    a.appendChild(img);
    c.appendChild(a);
  });
}

/**
 * @param {number} num
 * @returns {string}
 */
function _formatNumber(num) {
  if (num === undefined || num === null) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'm';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

/**
 * @param {HTMLElement} c
 */
function showLoadingState(c) {
  if (!c) return;
  c.classList.add('loading');
  const overlay = c.querySelector('.loading-overlay');
  if (overlay) overlay.style.display = 'flex';
}

/**
 * @param {HTMLElement} c
 */
function hideLoadingState(c) {
  if (!c) return;
  c.classList.remove('loading');
  const overlay = c.querySelector('.loading-overlay');
  if (overlay) overlay.style.display = 'none';
}
