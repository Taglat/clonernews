import { getUpdates, getItemById } from './api.js';

const previousItemsMap = new Map();

function isItemChanged(oldItem, newItem) {
  if (!oldItem) return true;

  const keysToCheck = ["title", "text", "score", "descendants", "kids", "url"];
  return keysToCheck.some(key => {
    const oldVal = JSON.stringify(oldItem[key]);
    const newVal = JSON.stringify(newItem[key]);
    return oldVal !== newVal;
  });
}

async function checkForUpdates(allIds) {
  const updates = await getUpdates();
  const updatedIds = (updates.items || []).map(Number);
  const intersection = allIds.filter(id => updatedIds.includes(id));

  if (intersection.length === 0) {
    console.log("❌ Обновлений не было на всей странице");
    return false;
  }

  let realUpdates = [];

  for (const id of intersection) {
    const newItem = await getItemById(id);
    let oldItem = previousItemsMap.get(id);
    if (!oldItem) {
      oldItem = loadOldItemFromStorage(id);
    }

    const changed = isItemChanged(oldItem, newItem);

    console.group(`🔄 Изменение ID ${id} ${changed ? "✅ ИЗМЕНЕНО" : "⚪ Без изменений"}`);
    console.log("📤 Новая версия:", newItem);
    console.log("📥 Старая версия:", oldItem ?? "Нет данных");
    console.groupEnd();

    if (changed) realUpdates.push(id);

    previousItemsMap.set(id, newItem);
    saveOldItemToStorage(id, newItem);
  }

  if (realUpdates.length === 0) {
    console.log("⚠️ Все записи были в /updates, но данные остались прежними");
    return false;
  }

  return true;
}

function saveOldItemToStorage(id, item) {
  localStorage.setItem(`item-${id}`, JSON.stringify(item));
}

function loadOldItemFromStorage(id) {
  const raw = localStorage.getItem(`item-${id}`);
  return raw ? JSON.parse(raw) : null;
}

export { checkForUpdates };
