import { useState } from "react";
import { Text, useInput } from "ink";

type CommandInputProps = {
  value: string;
  placeholder: string;
  interactive: boolean;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
};

export function CommandInput({ value, placeholder, interactive, onChange, onSubmit }: CommandInputProps) {
  const [offset, setOffset] = useState(() => Array.from(value).length);
  const characters = Array.from(value);
  const cursor = Math.min(offset, characters.length);

  useInput((input, key) => {
    // Global shortcuts never become input text or move the editing cursor.
    if(key.ctrl || key.meta || key.tab || key.escape || key.upArrow || key.downArrow
      || key.pageUp || key.pageDown || key.super || key.hyper) return;

    if(key.return) {
      onSubmit(value);
    } else if(key.leftArrow) {
      setOffset(Math.max(0, cursor - 1));
    } else if(key.rightArrow) {
      setOffset(Math.min(characters.length, cursor + 1));
    } else if(key.home) {
      setOffset(0);
    } else if(key.end) {
      setOffset(characters.length);
    } else if(key.backspace) {
      if(cursor === 0) return;
      characters.splice(cursor - 1, 1);
      setOffset(cursor - 1);
      onChange(characters.join(""));
    } else if(key.delete) {
      characters.splice(cursor, 1);
      onChange(characters.join(""));
    } else if(input) {
      const inserted = Array.from(input.replace(/[\r\n\t]/g, " "));
      characters.splice(cursor, 0, ...inserted);
      setOffset(cursor + inserted.length);
      onChange(characters.join(""));
    }
  }, { isActive: interactive });

  const displayed = Array.from(value || placeholder);
  return (
    <Text dimColor={!value}>
      {interactive ? (
        <>
          {displayed.slice(0, cursor).join("")}
          <Text inverse>{displayed[cursor] || " "}</Text>
          {displayed.slice(cursor + 1).join("")}
        </>
      ) : displayed.join("")}
    </Text>
  );
}
