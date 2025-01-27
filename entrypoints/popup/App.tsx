import reactLogo from '@/assets/react.svg';
import BookmarksDataTable from '@/components/bookmarks/data-table.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input';
import { type BM, fetchFilteredBookmarks, groupUrlsByDomain } from '@/entrypoints/utils';
import { ChangeEvent, useEffect, useState } from 'react';

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
    <Input
      type='search'
      placeholder='Search bookmarks by domain...'
      ref={ref}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
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
        <img alt='' src={reactLogo} className='w-12' />
        <Button variant='outline' className='rounded h-[unset]'>
          <img alt='' src={wxtLogo} className='w-12' />
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
                <BookmarksDataTable data={bookmarks} />
              </div>
            </details>
          </article>
        );
      })}
    </div>
  );
}

export default App;
