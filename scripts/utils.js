function loadData(keyName) {
  const data = localStorage.getItem(keyName);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

function saveData(data, keyName) {
  localStorage.setItem(keyName, JSON.stringify(data));
}

function getBaseUrl(repositoryName = "dream-phase") {
  if (window.location.pathname.includes(`/${repositoryName}/`)) {
    return `/${repositoryName}/`;
  }
  return "/";
}

export { loadData, saveData, getBaseUrl };
