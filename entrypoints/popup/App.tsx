import reactLogo from '@/assets/react.svg';
import BookmarksTable from '@/components/bookmarks-table';
import { BM, readBookmarks } from '@/entrypoints/utils';
import { useEffect, useState } from 'react';

import wxtLogo from '/wxt.svg';

function App() {
  const [count, setCount] = useState(0);
  const [bookmarks, setBookmarks] = useState<BM[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const allUrls = await readBookmarks();
      // This filtering logic may not be working as expected
      // Possible reasons:
      // 1. 'location.origin' might not be available or correct in the extension context
      // 2. The URL constructor might throw an error for invalid URLs
      // 3. The filter condition might be too strict
      // Consider logging 'allUrls' and 'location.origin' for debugging
      console.log('All URLs:', allUrls);

      const filtered = allUrls.filter((i) => {
        try {
          return i.url && new URL(i.url).origin.includes('amazon');
        } catch (error) {
          console.error('Error parsing URL:', i.url, error);
          return false;
        }
      });
      console.log('Filtered URLs:', filtered);
      setBookmarks(filtered);
    };
    fetchBookmarks();
  }, []);

  return (
    <div className='text-black w-full'>
      <img src={wxtLogo} className='w-12' />
      <h1 className='text-3xl'>{bookmarks.length}</h1>

      <BookmarksTable data={bookmarks} />
    </div>
  );
}

export default App;
