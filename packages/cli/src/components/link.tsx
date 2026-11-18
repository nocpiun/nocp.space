import type { ReactNode } from "react";
import { Text, Transform } from "ink";
import ansiEscapes from "ansi-escapes";
import { supportsOsc8 } from "../utils/link.js";

type TerminalLinkProps = {
  url: string;
  children: ReactNode;
};

export function TerminalLink({ url, children }: TerminalLinkProps) {
  if(!supportsOsc8) return <>{children}</>;

  return (
    <Transform transform={(output) => ansiEscapes.link(output, url)}>
      <Text>{children}</Text>
    </Transform>
  );
}
