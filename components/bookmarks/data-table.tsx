'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BM } from '@/entrypoints/utils';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { DateTime } from 'luxon';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export const columns: ColumnDef<BM>[] = [
  {
    accessorKey: 'dateAdded',
    cell: (info) => {
      const unix = info.getValue<number>();
      const pastTime = DateTime.fromMillis(unix);
      const now = DateTime.now();
      const elapsed = now.diff(pastTime, ['years', 'days', 'hours', 'minutes', 'seconds']);
      return (
        <time className={'text-xs'} title={`[${unix}]`}>
          {elapsed.toHuman()}
        </time>
      );
    },

    header: () => <span>Time</span>,
  },
  {
    accessorKey: 'url',
    cell: ({ row, getValue }) => (
      <a
        title={getValue<string>()}
        className='block w-100 overflow-hidden text-ellipsis'
        href={getValue<string>()}
        target='_blank'
        rel='noopener noreferrer'
      >
        {row.getValue<string>('url')}
      </a>
    ),

    header: () => <div>Title</div>,
  },
];

export default function BookmarksDataTable({ data }: { data: BM[] }) {
  return <DataTable columns={columns} data={data} />;
}
