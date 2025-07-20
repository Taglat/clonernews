import { getNewStories, getTopStories, getJobs } from "./api.js";
import { hideLoader, showLoader } from "./loader.js";
import { loadPage } from "./pagination.js";

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

document.addEventListener("click", async e => {
    const btn = e.target.closest("[data-page]");
    if (!btn) return;
    e.preventDefault();
    showLoader();
    await loadPage(ids, perPage, +btn.dataset.page);
    hideLoader();
});
