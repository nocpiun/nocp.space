import darkPlus from "shiki/themes/dark-plus.mjs";

const dark2026TokenColors = [
  {
    scope: [
      "comment",
      "punctuation.definition.comment",
      "string.comment",
    ],
    settings: {
      foreground: "#8b949e",
    },
  },
  {
    scope: [
      "constant.other.placeholder",
      "constant.character",
    ],
    settings: {
      foreground: "#ff7b72",
    },
  },
  {
    scope: [
      "constant",
      "entity.name.constant",
      "variable.other.constant",
      "variable.other.enummember",
      "variable.language",
      "entity",
    ],
    settings: {
      foreground: "#79c0ff",
    },
  },
  {
    scope: [
      "entity.name",
      "meta.export.default",
      "meta.definition.variable",
    ],
    settings: {
      foreground: "#ffa657",
    },
  },
  {
    scope: [
      "variable.parameter.function",
      "meta.jsx.children",
      "meta.block",
      "meta.tag.attributes",
      "entity.name.constant",
      "meta.object.member",
      "meta.embedded.expression",
    ],
    settings: {
      foreground: "#c9d1d9",
    },
  },
  {
    scope: "entity.name.function",
    settings: {
      foreground: "#d2a8ff",
    },
  },
  {
    scope: [
      "entity.name.tag",
      "support.class.component",
    ],
    settings: {
      foreground: "#7ee787",
    },
  },
  {
    scope: "keyword",
    settings: {
      foreground: "#ff7b72",
    },
  },
  {
    scope: [
      "storage",
      "storage.type",
    ],
    settings: {
      foreground: "#ff7b72",
    },
  },
  {
    scope: [
      "storage.modifier.package",
      "storage.modifier.import",
      "storage.type.java",
    ],
    settings: {
      foreground: "#c9d1d9",
    },
  },
  {
    scope: [
      "string",
      "string punctuation.section.embedded source",
    ],
    settings: {
      foreground: "#a5d6ff",
    },
  },
  {
    scope: "support",
    settings: {
      foreground: "#79c0ff",
    },
  },
  {
    scope: "meta.property-name",
    settings: {
      foreground: "#79c0ff",
    },
  },
  {
    scope: "variable",
    settings: {
      foreground: "#ffa657",
    },
  },
  {
    scope: "variable.other",
    settings: {
      foreground: "#c9d1d9",
    },
  },
  {
    scope: "invalid.broken",
    settings: {
      foreground: "#ffa198",
      fontStyle: "italic",
    },
  },
  {
    scope: "invalid.deprecated",
    settings: {
      foreground: "#ffa198",
      fontStyle: "italic",
    },
  },
  {
    scope: "invalid.illegal",
    settings: {
      foreground: "#ffa198",
      fontStyle: "italic",
    },
  },
  {
    scope: "invalid.unimplemented",
    settings: {
      foreground: "#ffa198",
      fontStyle: "italic",
    },
  },
  {
    scope: "carriage-return",
    settings: {
      foreground: "#f0f6fc",
      fontStyle: "italic underline",
    },
  },
  {
    scope: "message.error",
    settings: {
      foreground: "#ffa198",
    },
  },
  {
    scope: "string variable",
    settings: {
      foreground: "#79c0ff",
    },
  },
  {
    scope: [
      "source.regexp",
      "string.regexp",
    ],
    settings: {
      foreground: "#a5d6ff",
    },
  },
  {
    scope: [
      "string.regexp.character-class",
      "string.regexp constant.character.escape",
      "string.regexp source.ruby.embedded",
      "string.regexp string.regexp.arbitrary-repitition",
    ],
    settings: {
      foreground: "#a5d6ff",
    },
  },
  {
    scope: "string.regexp constant.character.escape",
    settings: {
      foreground: "#7ee787",
      fontStyle: "bold",
    },
  },
  {
    scope: "support.constant",
    settings: {
      foreground: "#79c0ff",
    },
  },
  {
    scope: "support.variable",
    settings: {
      foreground: "#79c0ff",
    },
  },
  {
    scope: "support.type.property-name.json",
    settings: {
      foreground: "#7ee787",
    },
  },
  {
    scope: "meta.module-reference",
    settings: {
      foreground: "#79c0ff",
    },
  },
  {
    scope: "punctuation.definition.list.begin.markdown",
    settings: {
      foreground: "#ffa657",
    },
  },
  {
    scope: [
      "markup.heading",
      "markup.heading entity.name",
    ],
    settings: {
      foreground: "#79c0ff",
      fontStyle: "bold",
    },
  },
  {
    scope: "markup.quote",
    settings: {
      foreground: "#7ee787",
    },
  },
  {
    scope: "markup.italic",
    settings: {
      foreground: "#c9d1d9",
      fontStyle: "italic",
    },
  },
  {
    scope: "markup.bold",
    settings: {
      foreground: "#c9d1d9",
      fontStyle: "bold",
    },
  },
  {
    scope: ["markup.underline"],
    settings: {
      fontStyle: "underline",
    },
  },
  {
    scope: ["markup.strikethrough"],
    settings: {
      fontStyle: "strikethrough",
    },
  },
  {
    scope: "markup.inline.raw",
    settings: {
      foreground: "#79c0ff",
    },
  },
  {
    scope: [
      "markup.deleted",
      "meta.diff.header.from-file",
      "punctuation.definition.deleted",
    ],
    settings: {
      foreground: "#ffa198",
    },
  },
  {
    scope: ["punctuation.section.embedded"],
    settings: {
      foreground: "#ff7b72",
    },
  },
  {
    scope: [
      "markup.inserted",
      "meta.diff.header.to-file",
      "punctuation.definition.inserted",
    ],
    settings: {
      foreground: "#7ee787",
    },
  },
  {
    scope: [
      "markup.changed",
      "punctuation.definition.changed",
    ],
    settings: {
      foreground: "#ffa657",
    },
  },
  {
    scope: [
      "markup.ignored",
      "markup.untracked",
    ],
    settings: {
      foreground: "#0d1117",
    },
  },
  {
    scope: "meta.diff.range",
    settings: {
      foreground: "#d2a8ff",
      fontStyle: "bold",
    },
  },
  {
    scope: "meta.diff.header",
    settings: {
      foreground: "#79c0ff",
    },
  },
  {
    scope: "meta.separator",
    settings: {
      foreground: "#79c0ff",
      fontStyle: "bold",
    },
  },
  {
    scope: "meta.output",
    settings: {
      foreground: "#79c0ff",
    },
  },
  {
    scope: [
      "brackethighlighter.tag",
      "brackethighlighter.curly",
      "brackethighlighter.round",
      "brackethighlighter.square",
      "brackethighlighter.angle",
      "brackethighlighter.quote",
    ],
    settings: {
      foreground: "#8b949e",
    },
  },
  {
    scope: "brackethighlighter.unmatched",
    settings: {
      foreground: "#ffa198",
    },
  },
  {
    scope: [
      "constant.other.reference.link",
      "string.other.link",
    ],
    settings: {
      foreground: "#a5d6ff",
    },
  },
  {
    scope: "token.info-token",
    settings: {
      foreground: "#6796E6",
    },
  },
  {
    scope: "token.warn-token",
    settings: {
      foreground: "#CD9731",
    },
  },
  {
    scope: "token.error-token",
    settings: {
      foreground: "#F44747",
    },
  },
  {
    scope: "token.debug-token",
    settings: {
      foreground: "#B267E6",
    },
  },
];

/**
 * Built from microsoft/vscode extensions/theme-defaults/themes/2026-dark.json
 * extending dark_modern -> dark_plus.
 * 
 * @see https://github.com/microsoft/vscode/blob/36e8c0289a5f29eae15a933263220d9895302ff6/extensions/theme-defaults/themes/2026-dark.json
 */
export const dark2026Theme = {
  ...darkPlus,
  name: "2026-dark",
  displayName: "2026 Dark",
  type: "dark" as const,
  colors: {
    ...darkPlus.colors,
    "editor.background": "#121314",
    "editor.foreground": "#BBBEBF",
  },
  tokenColors: [
    ...(darkPlus.tokenColors ?? []),
    ...dark2026TokenColors,
  ],
};
