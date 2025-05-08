// https://tiptap.dev/api/nodes/heading

import { defineTool } from "../lib";
import customMessages from "../i18n/custom-messages";
import type { Level } from "@tiptap/extension-heading";
import type { Editor } from "@tiptap/core";

export default (level: Level) => {
    const msgKey = `h${level}` as keyof typeof customMessages.tools;

    return defineTool({
        key: `h${level}`,
        name: customMessages.tools[msgKey],
        display: `H${level}`,
        extension: [], // Use the CustomHeading extension from interface.vue
        groups: ["format"],
        shortcut: ["meta", "alt", level.toString()],
        action: (editor: Editor) =>
            editor.chain().focus().toggleHeading({ level }).run(),
        disabled: (editor: Editor) =>
            !editor.can().chain().focus().toggleHeading({ level }).run(),
        active: (editor: Editor) => editor.isActive("heading", { level }),
    });
};
