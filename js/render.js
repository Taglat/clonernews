import { loadComments } from "./api.js";

export function renderItems(items) {
  const container = document.querySelector("main .container");
  container.innerHTML = "";
  
  items.forEach(item => {
    let element;
    switch (item.type) {
      case 'story':
        element = renderStoryItem(item);
        break;
      case 'job':
        element = renderJobItem(item);
        break;
      default:
        element = renderGenericItem(item);
        break;
    }
    container.appendChild(element);
  });
}

function renderStoryItem(item) {
  const el = document.createElement('div');
  el.className = 'story';
  el.innerHTML = `
    <h3><a href="${item.url || '#'}" target="_blank">${item.title}</a></h3>
    <p>by ${item.by} | Comments: ${item.descendants || 0}</p>
    <button class="comments-btn" data-id="${item.id}">Show Comments</button>
    <div class="comments" id="comments-${item.id}" style="display:none;"></div>
  `;
  
  // Add click handler for comments button
  const btn = el.querySelector('.comments-btn');
  const commentsDiv = el.querySelector('.comments');
  
  btn.addEventListener('click', async () => {
    if (commentsDiv.style.display === 'none') {
      if (!item.kids || !item.kids.length) {
        commentsDiv.innerHTML = '<p>No comments</p>';
      } else {
        commentsDiv.innerHTML = '<p>Loading comments...</p>';
        const tree = await loadComments(item.kids);
        commentsDiv.innerHTML = '';
        renderComments(tree, commentsDiv);
      }
      commentsDiv.style.display = 'block';
      btn.textContent = 'Hide Comments';
    } else {
      commentsDiv.style.display = 'none';
      btn.textContent = 'Show Comments';
    }
  });
  
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

function renderGenericItem(item) {
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

function renderComments(list, parent) {
  list.forEach(c => {
    if (!c || c.deleted) return;
    
    const div = document.createElement("div");
    div.className = "comment";
    div.innerHTML = `
      <p><b>${c.by || 'Anonymous'}</b>:</p>
      <div class="text">${c.text || "[deleted]"}</div>
    `;
    parent.appendChild(div);
    
    if (c.children && c.children.length) {
      const sub = document.createElement("div");
      sub.className = "nested";
      div.appendChild(sub);
      renderComments(c.children, sub);
    }
  });
}