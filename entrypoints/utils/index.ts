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
export default { traverseBookmarks, readBookmarks };
