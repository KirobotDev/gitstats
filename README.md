# GitHub Stats Card

Generate beautiful, glassmorphic, embeddable stats cards for any GitHub repository without needing a backend. This project is 100% static and uses the GitHub REST API directly from the browser.

## Features

- **Zero Backend**: Hosted purely on GitHub Pages.
- **Dynamic Stats**: Fetches stars, forks, issues, watchers in real-time.
- **Language Breakdown**: Beautiful animated Chart.js donut chart with official language icons (Devicons).
- **Star History Graph**: Sparkline showing recent star activity.
- **Top Contributors**: Shows avatars of top repository contributors.
- **Dark Glassmorphism UI**: Beautiful frosted glass design with animated gradients.

## Usage

1. Go to the main page.
2. Enter a GitHub repository like `torvalds/linux` or `facebook/react`.
3. Preview the card dynamically.
4. Copy the Markdown embed code provided to add it to your `README.md`.

## Embed in a README

You can embed the generated card in your README using standard Markdown syntax, pointing to the `/card.html` endpoint.

```md
[![My Repo Stats](https://my-username.github.io/my-stats-site/card.html?repo=my-username/my-repo)](https://github.com/my-username/my-repo)
```

## Setup for Self Hosting

Since there is no backend, you just need a standard static web server or GitHub pages.

1. Clone the repo.
2. Serve the directory with `npx serve .` or host it via GitHub Pages.

> Note: The GitHub API allows 60 unauthenticated requests per hour per IP.

## Structure

- `index.html`: Main site, handles searching and generating links.
- `card.html`: Standalone page, optimized to act like an embeddable image/widget.
- `js/`: Application logic (api, charts, DOM rendering)
- `css/`: Design system
