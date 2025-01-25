import { DeleteBookmarkConfirmationDialogWithAction } from '@/components/bookmarks/delete-bookmark-confirmation-dialog.tsx';
import { ElapsedTime } from '@/components/bookmarks/elapsed-time.tsx';
import { ShowBookmarkBadges } from '@/components/bookmarks/show-bookmark-badges.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BM } from '@/entrypoints/utils';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
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
    id: 'tags',
    enableHiding: false,
    cell: ({ row }) => {
      const bookmark = row.original;
      return <ShowBookmarkBadges bookmark={bookmark} />;
    },
  },
  {
    accessorKey: 'dateAdded',
    header: () => <span>Time</span>,
    cell: (info) => {
      const unix = info.getValue<number>();
      return <ElapsedTime unix={unix} />;
    },
  },
  // {
  //   accessorKey: 'title',
  //   enableHiding: true,
  // },
  {
    accessorKey: 'url',
    cell: ({ row, getValue }) => {
      const bookmark = row.original;
      const unix = row.getValue<number>('dateAdded'); //only works if its defined in this column
      return (
        <>
          <ElapsedTime unix={unix} />;
          <a
            title={bookmark.title}
            className='block w-100 overflow-hidden text-ellipsis'
            href={getValue<string>()}
            target='_blank'
            rel='noopener noreferrer'
          >
            {getValue<string>()}
          </a>
        </>
      );
    },

    header: () => <div>Title</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const bookmark = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className="z-50 min-w-[180px] bg-white flex flex-col gap-1 [&>[role='menuitem']]:p-2"
          >
            {/*<DropdownMenuLabel>Actions</DropdownMenuLabel>*/}
            <DropdownMenuItem
              className={'cursor-pointer focus:bg-green-100'}
              onClick={() => navigator.clipboard.writeText(bookmark.url!)}
            >
              Copy URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/*<DropdownMenuItem>View details</DropdownMenuItem>*/}
            <DeleteBookmarkConfirmationDialogWithAction bookmark={bookmark} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function BookmarksDataTable({ data }: { data: BM[] }) {
  return <DataTable columns={columns} data={data} />;
}
