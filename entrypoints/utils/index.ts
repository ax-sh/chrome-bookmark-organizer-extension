export type BM = Pick<chrome.bookmarks.BookmarkTreeNode, 'id' | 'url'>;

export function traverseBookmarks(node: chrome.bookmarks.BookmarkTreeNode): BM[] {
  let urls: BM[] = [];

  if (node.url) {
    urls.push({ url: node.url, id: node.id });
  }

  if (node.children) {
    for (const child of node.children) {
      urls = urls.concat(traverseBookmarks(child));
    }
  }

  return urls;
}
export default { traverseBookmarks };
