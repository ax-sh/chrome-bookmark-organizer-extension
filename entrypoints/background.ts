async function readBookmarks() {
  const bookmarks = await chrome.bookmarks.getTree();
  console.table(bookmarks);
  chrome.bookmarks.onChanged.addListener(() => {
    console.log(33);
  });
}

export default defineBackground(async () => {
  console.log('Hello background!', { id: browser.runtime.id });
  await readBookmarks();
});
