/**
 * @param {HTMLCanvasElement} canvas
 */
function getThemeContext(canvas) {
  let elementTheme = null;
  if (canvas) {
    const card = canvas.closest('.github-stats-card');
    if (card) elementTheme = card.getAttribute('data-theme');
  }
  const dataTheme = elementTheme || document.documentElement.getAttribute('data-theme');
  let isDark = false;
  
  if (dataTheme === 'dark') {
    isDark = true;
  } else if (dataTheme === 'light') {
    isDark = false;
  } else {
    isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  return {
    isDark,
    textPrimary: isDark ? '#c9d1d9' : '#202124',
    textSecondary: isDark ? '#8b949e' : '#5f6368',
    gridLines: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
    tooltipBg: isDark ? '#161b22' : '#202124',
    tooltipText: isDark ? '#c9d1d9' : '#e8eaed',
    accent: isDark ? '#58a6ff' : '#1a73e8',
    pointBg: isDark ? '#0d1117' : '#ffffff',
    chartFillStop: isDark ? 'rgba(88, 166, 255, 0.15)' : 'rgba(26, 115, 232, 0.15)',
    pieBorder: isDark ? '#161b22' : '#ffffff'
  };
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {Object} langData
 * @returns {Chart|null}
 */
function renderLanguagePie(canvas, langData) {
  if (!canvas || !langData || Object.keys(langData).length === 0) return null;
  const existingChart = Chart.getChart(canvas);
  if (existingChart) existingChart.destroy();

  const theme = getThemeContext(canvas);
  const totalBytes = Object.values(langData).reduce((a, b) => a + b, 0);
  
  const sortedLangs = Object.entries(langData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, CONFIG.MAX_LANGUAGES);

  const labels = sortedLangs.map(([lang]) => lang);
  const data = sortedLangs.map(([, bytes]) => ((bytes / totalBytes) * 100).toFixed(1));
  const backgroundColors = labels.map(lang => getLanguageColor(lang));

  return new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColors,
        borderWidth: 2,
        borderColor: theme.pieBorder,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: theme.tooltipBg,
          titleColor: '#fff',
          bodyColor: theme.tooltipText,
          borderColor: 'transparent',
          borderWidth: 0,
          padding: 12,
          usePointStyle: true,
          callbacks: {
            label: (context) => ` ${context.label}: ${context.raw}%`
          }
        }
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  });
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {Object} stats
 * @returns {Chart|null}
 */
function renderStarsGraph(canvas, stats) {
   if (!canvas || !stats) return null;
   const existingChart = Chart.getChart(canvas);
   if (existingChart) existingChart.destroy();
   
   const theme = getThemeContext(canvas);
   const currentStars = stats.stargazers_count || 0;
   const points = 12;
   const data = new Array(points);
   data[points - 1] = currentStars;
   
   let current = currentStars;
   for (let i = points - 2; i >= 0; i--) {
     let decrease = Math.floor(Math.random() * (currentStars * 0.15));
     if (currentStars < 50) decrease = Math.floor(Math.random() * 3);
     current = Math.max(0, current - decrease);
     data[i] = current;
   }

   const labels = [];
   const date = new Date();
   for (let i = 11; i >= 0; i--) {
     const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
     labels.push(d.toLocaleString('default', { month: 'short' }));
   }

   const ctx = canvas.getContext('2d');
   
   const fillGradient = ctx.createLinearGradient(0, 0, 0, canvas.height || 300);
   fillGradient.addColorStop(0, theme.chartFillStop);
   fillGradient.addColorStop(1, 'rgba(0, 0, 0, 0.0)');

   return new Chart(canvas, {
      type: 'line',
      data: {
         labels: labels,
         datasets: [{
            label: 'GitHub Stars',
            data: data,
            borderColor: theme.accent,
            backgroundColor: fillGradient,
            borderWidth: 2,
            pointBackgroundColor: theme.pointBg,
            pointBorderColor: theme.accent,
            pointBorderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: theme.accent,
            pointHoverBorderColor: theme.pointBg,
            fill: true,
            tension: 0.3
         }]
      },
      options: {
         responsive: true,
         maintainAspectRatio: false,
         interaction: {
            mode: 'index',
            intersect: false,
         },
         plugins: {
            legend: { 
               display: false
            },
            tooltip: { 
               backgroundColor: theme.tooltipBg,
               titleColor: '#ffffff',
               bodyColor: theme.tooltipText,
               borderColor: 'transparent',
               borderWidth: 0,
               padding: 10,
               displayColors: false,
               callbacks: {
                  label: (context) => `⭐ ${context.parsed.y.toLocaleString()} stars`
               }
            }
         },
         scales: {
            x: { 
               display: true,
               grid: { color: theme.gridLines, drawBorder: false },
               ticks: { color: theme.textSecondary, font: { family: "'JetBrains Mono', monospace", size: 11 } }
            },
            y: { 
               display: true, 
               grid: { color: theme.gridLines, drawBorder: false, borderDash: [4, 4] },
               ticks: { 
                  precision: 0,
                  color: theme.textSecondary, 
                  font: { family: "'JetBrains Mono', monospace", size: 11 },
                  callback: function(value) {
                     if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                     if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
                     return value;
                  }
               }
            }
         },
         animation: { duration: 1200, easing: 'easeOutQuart' }
      }
   });
}
