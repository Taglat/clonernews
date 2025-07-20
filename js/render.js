export function renderItems(items) {
  const container = document.querySelector("main .container");
  container.innerHTML = "";
  items.forEach(item => container.appendChild(renderStoryItem(item)));
}


function renderStoryItem(item) {
  const el = document.createElement('div');
  el.className = 'story';
  el.innerHTML = `
    <h3><a href="${item.url}" target="_blank">${item.title}</a></h3>
    <p>by ${item.by}</p>
    <p>Comment Count ${item.descendants}</p>
  `;
  return el;
}

function renderJobItem(item) {
  const el = document.createElement('div');
  el.className = 'job';
  el.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.text || ''}</p>
  `;
  return el;
}

export function renderGenericItem(item) {
  const el = document.createElement('div');
  el.className = 'generic';
  el.innerHTML = `
    <h3>${item.title || '[Без заголовка]'}</h3>
    <p>Тип: ${item.type}</p>
  `;
  return el;
}


export function renderPagination(total, perPage, current) {
    const pages = Math.ceil(total / perPage);
    const container = document.querySelector("footer .container");
    container.innerHTML = "";

    for (let p = 1; p <= pages; p++) {
        const a = document.createElement("a");
        a.href = "#";
        a.dataset.page = p;
        a.textContent = p;
        if (p === current) a.style.fontWeight = "700";
        a.style.margin = "0 4px";
        container.appendChild(a);
    }
}