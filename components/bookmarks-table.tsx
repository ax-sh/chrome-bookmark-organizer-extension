import { BM } from '@/entrypoints/utils';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper<BM>();

const columns = [
  columnHelper.accessor('title', {
    cell: (info) => (
      <a href={info.cell.row.original.url} target='_blank' rel='noopener noreferrer'>
        {info.getValue()}
      </a>
    ),
    header: () => <span>Title</span>,
  }),
  columnHelper.accessor('url', {
    cell: (info) => (
      <a href={info.getValue()} target='_blank' rel='noopener noreferrer'>
        {info.getValue()}
      </a>
    ),
    header: () => <span>URL</span>,
  }),
];

const BookmarksTable = ({ data }: { data: BM[] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className='min-w-full divide-y divide-gray-200'>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className='px-6 py-4 whitespace-nowrap'>
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
