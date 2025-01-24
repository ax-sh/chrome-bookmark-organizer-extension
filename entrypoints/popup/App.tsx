import reactLogo from '@/assets/react.svg';
import BookmarksTable from '@/components/bookmarks-table';
import { type BM, fetchFilteredBookmarks } from '@/entrypoints/utils';
import { useEffect, useState } from 'react';

import wxtLogo from '/wxt.svg';

function App() {
  const [bookmarks, setBookmarks] = useState<BM[]>([]);
  const [searchTerm, setSearchTerm] = useState('hoto');

  useEffect(() => {
    const fetchBookmarks = async () => {
      const filtered = await fetchFilteredBookmarks(searchTerm);
      console.log('Filtered URLs:', filtered);
      setBookmarks(filtered);
    };
    fetchBookmarks();
  }, [searchTerm]);

  return (
    <div className='text-black w-full min-w-[600px]'>
      <section className='flex items-center justify-between p-4'>
        <img alt='' src={wxtLogo} className='w-12' />
        <img alt='' src={reactLogo} className='w-12' />
        <h1 className='text-3xl text-white'>{bookmarks.length}</h1>
      </section>
      <div className='flex flex-col p-4'>
        <input
          type='search'
          value={searchTerm}
          placeholder='Search bookmarks by domain...'
          className='p-2 border border-gray-300 rounded text-white bg-[#111] '
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <BookmarksTable data={bookmarks} />
    </div>
  );
}

export default App;
