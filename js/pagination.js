import { renderItems, renderPagination } from "./render.js";
import { getItemById } from "./api.js";
import { hideLoader, showLoader } from "./loader.js";

export async function loadPage(ids, perPage, page) {
    const currentPage = page;

    const slice = ids.slice((page - 1) * perPage, page * perPage);
    const items = await Promise.all(slice.map(getItemById));

    renderItems(items);
    renderPagination(ids.length, perPage, currentPage);
}

export function setupPaginationHandler(ids, perPage, onPageChange) {
  document.addEventListener("click", async e => {
    const btn = e.target.closest("[data-page]");
    if (!btn) return;
    e.preventDefault();
    
    const newPage = +btn.dataset.page;
    onPageChange(newPage); // сообщаем наружу

    showLoader();
    await loadPage(ids, perPage, newPage);
    hideLoader();
  });
}