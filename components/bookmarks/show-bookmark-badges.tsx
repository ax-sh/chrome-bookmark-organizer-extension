import { Badge } from '@/components/ui/badge.tsx';
import { BM } from '@/entrypoints/utils';
import { useEffect } from 'react';

export function ShowBookmarkBadges({ bookmark }: { bookmark: BM }) {
  const [parent, setParent] = useState<string>();
  useEffect(() => {
    chrome.bookmarks.get(bookmark.parentId!).then(([i]) => {
      setParent(i.title!);
    });
  }, [bookmark]);

  return (
    <Badge className={'text-xs whitespace-nowrap'} variant='secondary'>
      {parent}
    </Badge>
  );
}
