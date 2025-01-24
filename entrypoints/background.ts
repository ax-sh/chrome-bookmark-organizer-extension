import { traverseBookmarks } from './utils';

async function readBookmarks() {
  const bookmarks = await chrome.bookmarks.getTree();
  const allUrls = bookmarks.flatMap((node) => traverseBookmarks(node));
  console.log('All bookmark URLs:');
  console.table(allUrls);

  chrome.bookmarks.onChanged.addListener(() => {
    console.log('Bookmarks changed - re-reading...');
  });

  return allUrls;
}

export default defineBackground(async () => {
  console.log('Hello background!', { id: browser.runtime.id });

  await readBookmarks();
});
