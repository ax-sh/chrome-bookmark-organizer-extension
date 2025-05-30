import { Badge } from "@/components/ui/badge.tsx";
import { BM } from "@/entrypoints/utils";
import { useEffect, useState } from "react";

export function ShowBookmarkBadges({ bookmark }: { bookmark: BM }) {
  const [parent, setParent] = useState<string>("");
  useEffect(() => {
    chrome.bookmarks.get(bookmark.parentId!).then(([{ title }]) => {
      setParent(title ?? "");
    });
  }, [bookmark]);

  return (
    <Badge className={"text-[0.5rem] whitespace-nowrap"} variant="secondary">
      {parent}
    </Badge>
  );
}
