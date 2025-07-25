async function getData(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        console.log("Failed to retrieve data from API");
        return null;
    }
}

const BASE_URL = "https://hacker-news.firebaseio.com/v0";

async function getNewStories() {
    const url = `${BASE_URL}/newstories.json`; // main page
    const data = await getData(url)
    console.log("getNewStories", data)
    return data;
}

async function getTopStories() {
    const url = `${BASE_URL}/topstories.json`;
    const data = await getData(url)
    console.log("getTopStories", data)
    return data;
}

async function getJobs() {
    const url = `${BASE_URL}/jobstories.json`;
    const data = await getData(url)
    console.log("getJobs", data)
    return data;
}

// async function getPolls() {
//     const url = ``;
//     const data = await getData(url)
//     console.log("getPolls", data)
//     return data;
// }

async function getItemById(id) {
    const res = await fetch(`${BASE_URL}/item/${id}.json`);
    return await res.json();
}

async function loadComments(ids) {
  const items = await Promise.all(ids.map(getItemById));
  return Promise.all(items.map(async c => ({
    ...c,
    children: c.kids ? await loadComments(c.kids) : []
  })));
}

async function getUpdates() {
  const res = await fetch(`${BASE_URL}/updates.json`);
  return await res.json();
}

export { getNewStories, getTopStories, getJobs, getItemById, loadComments, getUpdates }