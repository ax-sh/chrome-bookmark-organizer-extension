import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.tsx';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu.tsx';
import { BM } from '@/entrypoints/utils';
import { PropsWithChildren } from 'react';

export function DeleteBookmarkConfirmationDialog({ children }: PropsWithChildren) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className='cursor-pointer text-red-600 focus:bg-red-100'
          onSelect={(e) => e.preventDefault()}
        >
          Delete bookmark
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the bookmark.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>{children}</AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DeleteBookmarkConfirmationDialogWithAction({ bookmark }: { bookmark: BM }) {
  return (
    <DeleteBookmarkConfirmationDialog>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        className={'bg-red-500 cursor-pointer'}
        onClick={() => {
          /* Add delete logic here */
          console.log(bookmark, '<deleting todo impl');
        }}
      >
        Delete
      </AlertDialogAction>
    </DeleteBookmarkConfirmationDialog>
  );
}
