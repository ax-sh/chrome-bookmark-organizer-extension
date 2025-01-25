import reactLogo from '@/assets/react.svg';
import BookmarksTable from '@/components/bookmarks-table';
import BookmarksDataTableImpl, { BookmarksDataTable } from '@/components/bookmarks/data-table';
import { Button } from '@/components/ui/button.tsx';
import { type BM, fetchFilteredBookmarks, groupUrlsByDomain } from '@/entrypoints/utils';
import { useEffect, useState } from 'react';

import wxtLogo from '/wxt.svg';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchInput({ value, onChange }: SearchInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <input
      ref={ref}
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
  const [groupedBookmarks, setGroupedBookmarks] = useState<{ [key: string]: BM[] }>({});

  useEffect(() => {
    fetchFilteredBookmarks(searchTerm).then((filtered) => {
      console.log('Filtered URLs:', filtered);
      const grouped = groupUrlsByDomain(filtered);
      setGroupedBookmarks(grouped);

      setBookmarks(filtered);
    });
  }, [searchTerm]);

  return (
    <div className='text-black w-full min-w-[600px]'>
      <section className='flex items-center justify-between p-4'>
        <img alt='' src={wxtLogo} className='w-12' />
        <img alt='' src={reactLogo} className='w-12' />
        <Button variant='outline' className='rounded'>
          Button
        </Button>
        <h1 className='text-3xl text-white'>{bookmarks.length}</h1>
      </section>
      <div className='flex flex-col p-4'>
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
      </div>

      {Object.entries(groupedBookmarks).map(([domain, bookmarks]) => {
        return (
          <article key={domain} className='prose w-[700px] py-8'>
            <details>
              <summary className='bg-white prose text-xl text-black p-2 cursor-pointer'>
                [{bookmarks.length}] {domain}
              </summary>
              <div className='prose bg-white overflow-hidden'>
                {/*<BookmarksTable data={bookmarks} />*/}
                <BookmarksDataTableImpl data={bookmarks} />
              </div>
            </details>
          </article>
        );
      })}
    </div>
  );
}

export default App;
