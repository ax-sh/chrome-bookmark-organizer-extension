import { BM } from '@/entrypoints/utils';
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DATASET } from 'linkedom/types/shared/symbols';
import { DateTime } from 'luxon';

const columnHelper = createColumnHelper<BM>();

const columns = [
  columnHelper.accessor('title', {
    cell: (info) => (
      <a
        title={info.getValue()}
        className='block w-100 overflow-hidden text-ellipsis'
        href={info.cell.row.original.url}
        target='_blank'
        rel='noopener noreferrer'
      >
        {info.getValue()}
      </a>
    ),
    header: () => <span>Title</span>,
  }),
  columnHelper.accessor('dateAdded', {
    cell: (info) => {
      const unix = info.getValue<number>();
      const pastTime = DateTime.fromMillis(unix);
      const now = DateTime.now();
      const elapsed = now.diff(pastTime, ['days', 'hours', 'minutes', 'seconds']);
      return <time title={`[${unix}]`}>{elapsed.toHuman()}</time>;
    },

    header: () => <span>URL</span>,
  }),
];

const BookmarksTable = ({ data }: { data: BM[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <table className='w-full divide-gray-200'>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className='h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className='[&_tr:last-child]:border-0'>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className='p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookmarksTable;
