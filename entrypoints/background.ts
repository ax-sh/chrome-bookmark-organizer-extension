interface BookmarkNode {
  children?: BookmarkNode[];
  url?: string;
  title: string;
  id: string;
}

type BM = Pick<BookmarkNode, 'id' | 'url'>;

function traverseBookmarks(node: BookmarkNode) {
  let urls: BM[] = [];

  // If the node has a URL, it's a bookmark (leaf node)
  if (node.url) {
    urls.push({ url: node.url, id: node.id });
  }

  // If the node has children (folder), recursively process them
  if (node.children) {
    for (const child of node.children) {
      urls = urls.concat(traverseBookmarks(child));
    }
  }

  return urls;
}

async function readBookmarks() {
  const bookmarks = await chrome.bookmarks.getTree();
  const allUrls = bookmarks.flatMap((node) => traverseBookmarks(node));
  console.log('All bookmark URLs:', allUrls);

  chrome.bookmarks.onChanged.addListener(() => {
    console.log('Bookmarks changed');
  });

  return allUrls;
}

export default defineBackground(async () => {
  console.log('Hello background!', { id: browser.runtime.id });
  await readBookmarks();
});
