import { useState } from "react";
import { Text, useInput } from "ink";
import { charWidth } from "./text-width.js";

function sliceWidth(chars: string[], start: number, end: number): number {
  let total = 0;
  for(let i = start; i < end; i++) {
    total += charWidth(chars[i]);
  }
  return total;
}

function fitScroll(chars: string[], cursor: number, prevScroll: number, maxWidth: number, interactive: boolean): number {
  if(maxWidth <= 0) return 0;

  let start = Math.max(0, Math.min(prevScroll, cursor));
  const cursorCellWidth = interactive ? charWidth(chars[cursor] ?? " ") : 0;

  while(start < cursor && sliceWidth(chars, start, cursor) + cursorCellWidth > maxWidth) {
    start++;
  }

  const trailingWidth = interactive && cursor === chars.length ? 1 : 0;
  while(start > 0 && sliceWidth(chars, start - 1, chars.length) + trailingWidth <= maxWidth) {
    start--;
  }

  return start;
}

type CommandInputProps = {
  value: string;
  placeholder: string;
  interactive: boolean;
  maxWidth: number;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
};

export function CommandInput({ value, placeholder, interactive, maxWidth, onChange, onSubmit }: CommandInputProps) {
  const [offset, setOffset] = useState(() => Array.from(value).length);
  const [scroll, setScroll] = useState(() => {
    const initial = Array.from(value);
    return fitScroll(initial, initial.length, 0, maxWidth, interactive);
  });
  const characters = Array.from(value);
  const cursor = Math.min(offset, characters.length);

  function updateCursor(nextChars: string[], nextCursor: number) {
    setOffset(nextCursor);
    setScroll(fitScroll(nextChars, nextCursor, scroll, maxWidth, interactive));
  }

  useInput((input, key) => {
    // Global shortcuts never become input text or move the editing cursor.
    if(key.ctrl || key.meta || key.tab || key.escape || key.upArrow || key.downArrow
      || key.pageUp || key.pageDown || key.super || key.hyper) return;

    if(key.return) {
      onSubmit(value);
    } else if(key.leftArrow) {
      updateCursor(characters, Math.max(0, cursor - 1));
    } else if(key.rightArrow) {
      updateCursor(characters, Math.min(characters.length, cursor + 1));
    } else if(key.home) {
      updateCursor(characters, 0);
    } else if(key.end) {
      updateCursor(characters, characters.length);
    } else if(key.backspace) {
      if(cursor === 0) return;
      characters.splice(cursor - 1, 1);
      updateCursor(characters, cursor - 1);
      onChange(characters.join(""));
    } else if(key.delete) {
      if(cursor >= characters.length) return;
      characters.splice(cursor, 1);
      updateCursor(characters, cursor);
      onChange(characters.join(""));
    } else if(input) {
      const inserted = Array.from(input.replace(/[\r\n\t]/g, " "));
      characters.splice(cursor, 0, ...inserted);
      updateCursor(characters, cursor + inserted.length);
      onChange(characters.join(""));
    }
  }, { isActive: interactive });

  const displayed = Array.from(value || placeholder);
  const viewStart = value ? fitScroll(displayed, cursor, scroll, maxWidth, interactive) : 0;
  let viewEnd = viewStart;
  let used = 0;
  while(viewEnd < displayed.length) {
    const w = charWidth(displayed[viewEnd]);
    if(used + w > maxWidth) break;
    used += w;
    viewEnd++;
  }

  return (
    <Text dimColor={!value}>
      {interactive ? (
        <>
          {displayed.slice(viewStart, cursor).join("")}
          <Text inverse>{displayed[cursor] || " "}</Text>
          {displayed.slice(cursor + 1, viewEnd).join("")}
        </>
      ) : displayed.slice(viewStart, viewEnd).join("")}
    </Text>
  );
}
