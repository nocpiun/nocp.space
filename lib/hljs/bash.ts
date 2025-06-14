import { Language } from "highlight.js";

const bash: Language = {
	name: "bash",
	case_insensitive: true,
	contains: [
		{
			scope: "comment",
			begin: "#",
			end: "\n",
		},
		{
			scope: "built_in",
			begin: /^/,
			end: /(\n| )/
		},
		{
			scope: "comment",
			begin: /( -| --)/,
			end: " "
		},
		{
			scope: "string",
			begin: "\"",
			end: "\""
		},
		{
			scope: "string",
			begin: /http(s?):\/\//,
			end: " "
		},
		{
			scope: "number",
			begin: /\d+/,
		},
	]
};

export default bash;
