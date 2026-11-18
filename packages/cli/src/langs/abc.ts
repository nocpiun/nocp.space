import type { LanguageRegistration } from "shiki/core";

// TextMate grammar for Abc Music Notation, adapted from highlightjs-abc.
export const abcLanguage: LanguageRegistration = {
  name: "abc",
  scopeName: "source.abc",
  patterns: [
    { include: "#directive" },
    { include: "#field-title-lyrics" },
    { include: "#field-text" },
    { include: "#field-other" },
    { include: "#comment" },
    { include: "#chord" },
    { include: "#decoration" },
    { include: "#tuplet" },
    { include: "#barline" },
    { include: "#accidental" },
    { include: "#grouping" },
    { include: "#number" },
  ],
  repository: {
    comment: {
      name: "comment.line.percentage.abc",
      match: "%.*$",
    },
    directive: {
      begin: "^(%%\\S+)",
      beginCaptures: {
        "1": { name: "keyword.control.directive.abc" },
      },
      end: "(?=%)|$",
      patterns: [
        { include: "#chord" },
        { include: "#number" },
        {
          name: "constant.language.directive.abc",
          match: "\\b(?:not|octave|pitch|none|added|all)\\b|\\*",
        },
        {
          name: "string.unquoted.directive.abc",
          match: "[^%\\s]+",
        },
      ],
    },
    "field-title-lyrics": {
      begin: "^([TWw]:)",
      beginCaptures: {
        "1": { name: "keyword.other.field.abc" },
      },
      end: "(?=%)|$",
      patterns: [
        { include: "#barline" },
        {
          name: "entity.name.function.title.abc",
          match: "[^%|\\r\\n]+",
        },
      ],
    },
    "field-text": {
      begin: "^([COAZHBDFS]:)",
      beginCaptures: {
        "1": { name: "keyword.other.field.abc" },
      },
      end: "(?=%)|$",
      patterns: [
        {
          name: "string.unquoted.field.abc",
          match: "[^%\\r\\n]+",
        },
      ],
    },
    "field-other": {
      begin: "^([XTMLQPNGKRImrsUV+]:)",
      beginCaptures: {
        "1": { name: "keyword.other.field.abc" },
      },
      end: "(?=%)|$",
      patterns: [
        { include: "#chord" },
        { include: "#number" },
        { include: "#grouping" },
        {
          name: "constant.other.field-value.abc",
          match: "[^%\"\\d()\\[\\]{}/=\\s]+",
        },
      ],
    },
    chord: {
      name: "string.quoted.double.abc",
      match: "\"[^\"]*\"",
    },
    decoration: {
      name: "entity.name.tag.decoration.abc",
      match: "![^!\\s]+!",
    },
    tuplet: {
      name: "variable.other.tuplet.abc",
      match: "\\([2-9]",
    },
    barline: {
      name: "constant.other.barline.abc",
      match: "\\|\\||::|\\[?:*\\|(?::|\\[?[1-9])*\\]?",
    },
    accidental: {
      name: "keyword.operator.accidental.abc",
      match: "\\^{1,2}|_{1,2}|=",
    },
    grouping: {
      name: "variable.parameter.grouping.abc",
      match: "[-(){}\\[\\],'/]",
    },
    number: {
      name: "constant.numeric.abc",
      match: "\\d+",
    },
  },
};
