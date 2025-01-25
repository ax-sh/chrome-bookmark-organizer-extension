export type BM = Pick<
  chrome.bookmarks.BookmarkTreeNode,
  'id' | 'url' | 'title' | 'dateAdded' | 'parentId'
>;

export function traverseBookmarks(node: chrome.bookmarks.BookmarkTreeNode): BM[] {
  let urls: BM[] = [];

  if (node.url) {
    urls.push({
      url: node.url,
      id: node.id,
      title: node.title,
      dateAdded: node.dateAdded,
      parentId: node.parentId,
    });
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

const compareValues = <T>(
  a: T | null | undefined,
  b: T | null | undefined,
  order: 'asc' | 'desc'
) => {
  const direction = order === 'desc' ? -1 : 1;

  // Handle nullish values
  if (a == null && b == null) return 0;
  if (a == null) return -direction;
  if (b == null) return direction;

  if (a > b) return direction;
  if (a < b) return -direction;
  return 0;
};
// const sortByField = <T extends keyof BM>(
//     field: T,
//     order: 'asc' | 'desc'
// ) => (a: BM, b: BM) => compareValues(a[field], b[field], order);

// Solution 2: Strict Type Checking

// const sortByField = <T extends keyof BM>(
//     field: T,
//     order: 'asc' | 'desc',
//     fallback: NonNullable<BM[T]> // Fallback value to use when undefined
// ) => (a: BM, b: BM) => {
//   const aValue = a[field] ?? fallback;
//   const bValue = b[field] ?? fallback;
//
//   const direction = order === 'desc' ? -1 : 1;
//
//   if (aValue > bValue) return direction;
//   if (aValue < bValue) return -direction;
//   return 0;
// };

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
  const sortByField =
    <T extends keyof BM>(field: T, order: 'asc' | 'desc') =>
    (a: BM, b: BM) => {
      const aValue = a[field] ?? 0;
      const bValue = b[field] ?? 0;
      return order === 'desc' ? Number(bValue) - Number(aValue) : Number(aValue) - Number(bValue);
    };

  const sortedUrls = allUrls.toSorted(sortByField('dateAdded', 'asc'));
  const grouped = Object.groupBy(sortedUrls, (bookmark) => {
    try {
      const domain = new URL(bookmark.url!).hostname;
      return domain;
    } catch (error) {
      console.error('Error parsing URL:', bookmark.url, error);
      return '';
    }
  }) as Record<string, BM[]>;

  return Object.fromEntries(Object.entries(grouped).sort(([, a], [, b]) => b.length - a.length));
  // const groupedByDomain = allUrls.reduce(
  //   (acc, bookmark) => {
  //     try {
  //       const domain = new URL(bookmark.url!).hostname;
  //       if (!acc[domain]) acc[domain] = [];
  //       acc[domain].push(bookmark);
  //     } catch (error) {
  //       console.error('Error parsing URL:', bookmark.url, error);
  //     }
  //     return acc;
  //   },
  //   {} as Record<string, BM[]>
  // );
  // return groupedByDomain;
}
export default { traverseBookmarks, readBookmarks, fetchFilteredBookmarks, groupUrlsByDomain };
