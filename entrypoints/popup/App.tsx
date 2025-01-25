import reactLogo from '@/assets/react.svg';
import BookmarksTable from '@/components/bookmarks-table';
import { type BM, fetchFilteredBookmarks } from '@/entrypoints/utils';
import { useEffect, useState } from 'react';

import wxtLogo from '/wxt.svg';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type='search'
      value={value}
      placeholder='Search bookmarks by domain...'
      className='p-2 border border-gray-300 rounded text-white bg-[#111]'
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  );
}

function App() {
  const [bookmarks, setBookmarks] = useState<BM[]>([]);
  const [searchTerm, setSearchTerm] = useState('amazon');

  useEffect(() => {
    fetchFilteredBookmarks(searchTerm).then((filtered) => {
      console.log('Filtered URLs:', filtered);
      setBookmarks(filtered);
    });
  }, [searchTerm]);

  return (
    <div className='text-black w-full min-w-[600px]'>
      <section className='flex items-center justify-between p-4'>
        <img alt='' src={wxtLogo} className='w-12' />
        <img alt='' src={reactLogo} className='w-12' />
        <h1 className='text-3xl text-white'>{bookmarks.length}</h1>
      </section>
      <div className='flex flex-col p-4'>
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
      </div>

      <BookmarksTable data={bookmarks} />
    </div>
  );
}

export default App;
