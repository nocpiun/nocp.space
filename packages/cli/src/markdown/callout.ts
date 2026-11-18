import type * as Mdast from "mdast";
import { colors } from "../theme.js";

export type CalloutStyle = {
  label: string;
  color: string;
};

const calloutStyles: Record<string, CalloutStyle> = {
  info: { label: "Info", color: "#58a6ff" },
  note: { label: "Note", color: "#58a6ff" },
  tip: { label: "Tip", color: "#3fb950" },
  important: { label: "Important", color: "#a371f7" },
  warning: { label: "Warning", color: "#d29922" },
  caution: { label: "Caution", color: "#f85149" },
  error: { label: "Error", color: "#f85149" },
  danger: { label: "Danger", color: "#f85149" },
};

export function extractCallout(node: Mdast.Blockquote): {
  style: CalloutStyle;
  titleText?: string;
  children: (Mdast.BlockContent | Mdast.DefinitionContent)[];
} | null {
  const first = node.children[0];
  if(!first || first.type !== "paragraph" || first.children.length === 0) return null;
  const firstChild = first.children[0];
  if(firstChild.type !== "text") return null;

  const match = firstChild.value.match(/^\[!([A-Za-z]+)\](?:[ \t]+([^\r\n]+))?(?:\r?\n([\s\S]*))?$/);
  if(!match) return null;

  const key = match[1].toLowerCase();
  const style = calloutStyles[key] ?? {
    label: key.charAt(0).toUpperCase() + key.slice(1),
    color: colors.secondary,
  };

  const remainingParagraphChildren: Mdast.PhrasingContent[] = [];
  if(match[3]) {
    remainingParagraphChildren.push({ type: "text", value: match[3] });
  }
  const restInFirst = first.children.slice(1);
  if(restInFirst.length > 0) {
    const trimmedRest = !match[3] && restInFirst[0].type === "break" ? restInFirst.slice(1) : restInFirst;
    remainingParagraphChildren.push(...trimmedRest);
  }

  const children: (Mdast.BlockContent | Mdast.DefinitionContent)[] = [];
  if(remainingParagraphChildren.length > 0) {
    children.push({ type: "paragraph", children: remainingParagraphChildren });
  }
  children.push(...node.children.slice(1));

  return {
    style,
    titleText: match[2]?.trim(),
    children,
  };
}
