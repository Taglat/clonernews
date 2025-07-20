import { getNewStories, getTopStories, getJobs } from "./api.js";
import { hideLoader, showLoader } from "./loader.js";
import { loadPage, setupPaginationHandler } from "./pagination.js";
import { checkForUpdates } from "./updates.js";

const path = window.location.pathname;
let ids = [];

if (path.endsWith("index.html"))       ids = await getNewStories();
else if (path.endsWith("top-stories.html")) ids = await getTopStories();
else if (path.endsWith("jobs.html"))        ids = await getJobs();

const perPage = 10;
let currentPage = 1;

showLoader();
await loadPage(ids, perPage, currentPage);
hideLoader();

setupPaginationHandler(ids, perPage, page => {
  currentPage = page;
});

setInterval(async () => {
  const hasUpdates = await checkForUpdates(ids);
  if (hasUpdates) {
    document.getElementById("update-alert").style.display = "block";
  }
}, 5000);

document.getElementById("refresh-btn").addEventListener("click", async () => {
  if (path.endsWith("index.html"))       ids = await getNewStories();
  else if (path.endsWith("top-stories.html")) ids = await getTopStories();
  else if (path.endsWith("jobs.html"))        ids = await getJobs();

  currentPage = 1;
  showLoader();
  await loadPage(ids, perPage, currentPage);
  hideLoader();
  document.getElementById("update-alert").style.display = "none";
});
