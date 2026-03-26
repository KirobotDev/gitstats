document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const input = document.getElementById('repo-input');
  const cardContainer = document.getElementById('card-preview');
  const errorMsg = document.getElementById('error-message');
  const embedCode = document.getElementById('embed-code');
  const copyBtn = document.getElementById('copy-btn');
  const themeSelect = document.getElementById('theme-select');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const val = input.value.trim();
      const match = val.match(/github\.com\/([^\/]+)\/([^\/\?]+)/) || val.match(/^([^\/]+)\/([^\/\?]+)$/);
      
      if (!match) {
        showError('Please enter a valid GitHub repository URL or format: owner/repo');
        return;
      }

      const owner = match[1];
      const repo = match[2];

      hideError();
      if(cardContainer) showLoadingState(cardContainer);

      try {
        const data = await getAllRepoData(owner, repo);
        if(cardContainer) {
           renderCard(cardContainer, data);
           hideLoadingState(cardContainer);
           cardContainer.style.opacity = '1';
        }
        
        if (embedCode) {
           const baseUrl = window.location.href.split('index.html')[0].replace(/\/$/, '');
           const themeVal = themeSelect && themeSelect.value ? `&theme=${themeSelect.value}` : '';
           const embedUrl = `${baseUrl}/card.html?repo=${owner}/${repo}${themeVal}`;
           embedCode.value = `[![${repo} Stats](${embedUrl})](${data.stats.html_url})`;
           const embedContainer = document.querySelector('.embed-container');
           if (embedContainer) embedContainer.style.display = 'flex';
        }
      } catch (err) {
        if(cardContainer) hideLoadingState(cardContainer);
        showError(err.message);
      }
    });
  }

  if (copyBtn && embedCode) {
     copyBtn.addEventListener('click', () => {
        embedCode.select();
        document.execCommand('copy');
        const oldTxt = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = oldTxt, 2000);
     });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const repoParam = urlParams.get('repo');
  if (repoParam) {
     const [owner, repo] = repoParam.split('/');
     if (owner && repo && input && form) {
        input.value = `${owner}/${repo}`;
        form.dispatchEvent(new Event('submit'));
     }
  }

  if (themeSelect) {
     themeSelect.addEventListener('change', () => {
        const val = themeSelect.value;
        if (val) {
           if (cardContainer) cardContainer.setAttribute('data-theme', val);
        } else {
           if (cardContainer) cardContainer.removeAttribute('data-theme');
        }
        if (input.value && (!errorMsg.style.display || errorMsg.style.display === 'none')) {
           form.dispatchEvent(new Event('submit'));
        }
     });
  }

  function showError(msg) {
    if (errorMsg) {
      errorMsg.textContent = msg;
      errorMsg.style.display = 'block';
    }
  }

  function hideError() {
    if (errorMsg) {
      errorMsg.style.display = 'none';
    }
  }
});
