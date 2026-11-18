import type { ReactNode } from "react";
import { Text, Transform } from "ink";
import ansiEscapes from "ansi-escapes";
import supportsHyperlinks from "supports-hyperlinks";

const supportsOsc8 = supportsHyperlinks.stdout
  || (Boolean(process.stdout.isTTY) && (
    process.env.TERM_PROGRAM === "vscode"
    || Boolean(process.env.CURSOR_TRACE_ID)
  ));

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
