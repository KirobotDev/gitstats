/**
 * @typedef {Object} LanguageMeta
 * @property {string} color 
 * @property {string|null} icon 
 */

/** @type {Readonly<Record<string, LanguageMeta>>} */
const LANGUAGE_META = Object.freeze({
  'JavaScript':       { color: '#f1e05a', icon: 'javascript/javascript-original.svg' },
  'TypeScript':       { color: '#3178c6', icon: 'typescript/typescript-original.svg' },
  'Python':           { color: '#3572A5', icon: 'python/python-original.svg' },
  'Java':             { color: '#b07219', icon: 'java/java-original.svg' },
  'C':                { color: '#555555', icon: 'c/c-original.svg' },
  'C++':              { color: '#f34b7d', icon: 'cplusplus/cplusplus-original.svg' },
  'C#':               { color: '#178600', icon: 'csharp/csharp-original.svg' },
  'Go':               { color: '#00ADD8', icon: 'go/go-original.svg' },
  'Rust':             { color: '#dea584', icon: 'rust/rust-original.svg' },
  'Ruby':             { color: '#701516', icon: 'ruby/ruby-original.svg' },
  'PHP':              { color: '#4F5D95', icon: 'php/php-original.svg' },
  'Swift':            { color: '#F05138', icon: 'swift/swift-original.svg' },
  'Kotlin':           { color: '#A97BFF', icon: 'kotlin/kotlin-original.svg' },
  'Dart':             { color: '#00B4AB', icon: 'dart/dart-original.svg' },
  'HTML':             { color: '#e34c26', icon: 'html5/html5-original.svg' },
  'CSS':              { color: '#563d7c', icon: 'css3/css3-original.svg' },
  'SCSS':             { color: '#c6538c', icon: 'sass/sass-original.svg' },
  'Shell':            { color: '#89e051', icon: 'bash/bash-original.svg' },
  'PowerShell':       { color: '#012456', icon: 'powershell/powershell-original.svg' },
  'Lua':              { color: '#000080', icon: 'lua/lua-original.svg' },
  'R':                { color: '#198CE7', icon: 'r/r-original.svg' },
  'Scala':            { color: '#c22d40', icon: 'scala/scala-original.svg' },
  'Perl':             { color: '#0298c3', icon: 'perl/perl-original.svg' },
  'Haskell':          { color: '#5e5086', icon: 'haskell/haskell-original.svg' },
  'Elixir':           { color: '#6e4a7e', icon: 'elixir/elixir-original.svg' },
  'Clojure':          { color: '#db5855', icon: 'clojure/clojure-original.svg' },
  'Dockerfile':       { color: '#384d54', icon: 'docker/docker-original.svg' },
  'Jupyter Notebook': { color: '#DA5B0B', icon: 'jupyter/jupyter-original.svg' },
  'Vue':              { color: '#41b883', icon: 'vuejs/vuejs-original.svg' },
  'Objective-C':      { color: '#438eff', icon: 'objectivec/objectivec-plain.svg' },
  'Makefile':         { color: '#427819', icon: null },
  'MATLAB':           { color: '#e16737', icon: null },
  'OCaml':            { color: '#ef7a08', icon: null },
  'F#':               { color: '#b845fc', icon: null },
  'Nix':              { color: '#7e7eff', icon: null },
  'Assembly':         { color: '#6E4C13', icon: null },
  'Zig':              { color: '#ec915c', icon: null },
  'Nim':              { color: '#ffc200', icon: null },
  'Solidity':         { color: '#AA6746', icon: null },
  'HCL':              { color: '#844FBA', icon: null },
  'Terraform':        { color: '#844FBA', icon: null },
  'GraphQL':          { color: '#e10098', icon: null },
  'Svelte':           { color: '#ff3e00', icon: 'svelte/svelte-original.svg' },
  'Crystal':          { color: '#000100', icon: null },
});

/**
 * @param {string} language 
 * @returns {string|null} 
 */
function getLanguageIconUrl(language) {
  const meta = LANGUAGE_META[language];
  if (!meta?.icon) return null;
  return `${CONFIG.DEVICONS_CDN}/${meta.icon}`;
}

/**
 * @param {string} language 
 * @returns {string} 
 */
function getLanguageColor(language) {
  return LANGUAGE_META[language]?.color ?? '#8b949e';
}
