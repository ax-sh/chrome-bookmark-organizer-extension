export type BM = Pick<chrome.bookmarks.BookmarkTreeNode, 'id' | 'url' | 'title'>;

export function traverseBookmarks(node: chrome.bookmarks.BookmarkTreeNode): BM[] {
  let urls: BM[] = [];

  if (node.url) {
    urls.push({ url: node.url, id: node.id, title: node.title });
  }

  if (node.children) {
    for (const child of node.children) {
      urls = urls.concat(traverseBookmarks(child));
    }
  }

  return urls;
}

export async function readBookmarks() {
  const bookmarks = await chrome.bookmarks.getTree();
  const allUrls = bookmarks.flatMap((node) => traverseBookmarks(node));

  return allUrls;
}

export async function fetchFilteredBookmarks(domain: string) {
  const allUrls = await readBookmarks();

  if (!domain) return allUrls;
  // console.log('All URLs:', allUrls);
  const filtered = allUrls.filter((i) => {
    try {
      return i.url && new URL(i.url).origin.includes(domain);
    } catch (error) {
      console.error('Error parsing URL:', i.url, error);
      return false;
    }
  });
  return filtered;
}

export function groupUrlsByDomain(allUrls: BM[]) {
  const groupedByDomain = allUrls.reduce(
    (acc, bookmark) => {
      try {
        const domain = new URL(bookmark.url!).hostname;
        if (!acc[domain]) acc[domain] = [];
        acc[domain].push(bookmark);
      } catch (error) {
        console.error('Error parsing URL:', bookmark.url, error);
      }
      return acc;
    },
    {} as Record<string, BM[]>
  );
  return groupedByDomain;
}
export default { traverseBookmarks, readBookmarks, fetchFilteredBookmarks, groupUrlsByDomain };
