import { Button } from "@/components/ui/button";
import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter,
} from "@/components/ui/emoji-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SmileIcon } from "lucide-react";
import { useState } from "react";

export default function XeniaEmojiPicker({ setText, maxLength }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <SmileIcon className="active:bg-foreground active:text-background rounded-full" />
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <EmojiPicker
          className="h-85.5"
          onEmojiSelect={({ emoji }) => {
            setText((prev) => {
              if (prev.length + 2 < maxLength) return prev + emoji;
              return prev;
            });
          }}
        >
          <EmojiPickerSearch />
          <EmojiPickerContent />
          <EmojiPickerFooter />
        </EmojiPicker>
      </PopoverContent>
    </Popover>
  );
}
