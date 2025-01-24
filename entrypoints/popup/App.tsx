import reactLogo from '@/assets/react.svg';
import BookmarksTable from '@/components/bookmarks-table';
import { BM, fetchFilteredBookmarks } from '@/entrypoints/utils';
import { useEffect, useState } from 'react';

import wxtLogo from '/wxt.svg';

function App() {
  const [count, setCount] = useState(0);
  const [bookmarks, setBookmarks] = useState<BM[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const filtered = await fetchFilteredBookmarks('hoto');
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
