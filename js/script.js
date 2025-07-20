import {getNewStories, getTopStories, getJobs, getItemById } from "./api.js";

const currentPagePath = window.location.pathname;

let ids = [];

if (currentPagePath.endsWith("index.html")) {
    ids = await getNewStories();
} else if (currentPagePath.endsWith("top-stories.html")) {
    ids = await getTopStories();
} else if (currentPagePath.endsWith("jobs.html")) {
    ids = await getJobs();
}

const page = 0;
const perPage = 10;

const currentPageIds = ids.slice(page * perPage, (page + 1) * perPage);
const items = await Promise.all(currentPageIds.map(id => getItemById(id)));

console.log(currentPagePath, items)
