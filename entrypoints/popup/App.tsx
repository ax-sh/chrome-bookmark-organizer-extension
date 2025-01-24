import reactLogo from '@/assets/react.svg';
import BookmarksTable from '@/components/bookmarks-table';
import { BM, readBookmarks } from '@/entrypoints/utils';
import { useEffect, useState } from 'react';

import './App.css';
import wxtLogo from '/wxt.svg';

function App() {
  const [count, setCount] = useState(0);
  const [bookmarks, setBookmarks] = useState<BM[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const allUrls = await readBookmarks();
      setBookmarks(allUrls);
    };
    fetchBookmarks();
  }, []);

  return (
    <div className='bg-red-500 w-full'>
      <BookmarksTable data={bookmarks} />
    </div>
  );
}

export default App;
