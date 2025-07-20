import {getNewStories, getItemById } from "./api.js";

const page = 0;
const perPage = 10;

const ids = await getNewStories();

const currentPageIds = ids.slice(page * perPage, (page + 1) * perPage);
const posts = await Promise.all(currentPageIds.map(id => getItemById(id)));
