import { renderItems, renderPagination } from "./render.js";
import { getItemById } from "./api.js";

export async function loadPage(ids, perPage, page) {
    const currentPage = page;

    const slice = ids.slice((page - 1) * perPage, page * perPage);
    const items = await Promise.all(slice.map(getItemById));

    renderItems(items);
    renderPagination(ids.length, perPage, currentPage);
}
