import { groupUrlsByDomain, readBookmarks } from './utils';

export default defineBackground(async () => {
  console.log('w Hello background!', { id: browser.runtime.id });
  const allUrls = await readBookmarks();
  console.log('All bookmark URLs:');

  console.table(allUrls);

  // chrome.bookmarks.onChanged.addListener(() => {
  //   console.log('Bookmarks changed - re-reading...');
  // });

  const groupedByDomain = groupUrlsByDomain(allUrls);
  console.log('Grouped by domain:', groupedByDomain);
});
