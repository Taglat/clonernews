export function renderItems(items) {
  const container = document.querySelector('main .container'); // находит <div class="container"> внутри <main>
  container.innerHTML = ''; // очистить перед вставкой

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
