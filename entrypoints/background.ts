async function readBookmarks() {
  const bookmarks = await chrome.bookmarks.getTree()
  console.table(bookmarks)
}

export default defineBackground(async () => {
  console.log('Hello background!', { id: browser.runtime.id });
 await readBookmarks()
});
