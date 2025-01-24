import reactLogo from '@/assets/react.svg';
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
    <>
      <div className='bg-red-500 w-full'>
        <a href='https://wxt.dev' target='_blank'>
          <img src={wxtLogo} className='logo' alt='WXT logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>WXT + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {/* <pre>{JSON.stringify(bookmarks, null, 2)}</pre> */}
    </>
  );
}

export default App;
