import { Extension } from "@tiptap/core";
import { useCustomFormats } from "../composables/use-custom-formats";
import type { Tool } from "../types";

interface CustomFormat {
    name: string;
    tag: string;
    classes: string[];
    styles: Record<string, string>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        customFormat: {
            setCustomFormat: (format: CustomFormat) => ReturnType;
        };
    }
}

const customFormat: Tool = {
    key: "custom-format",
    name: "Custom Format",
    excludeFromOptions: true,
    extension: [
        Extension.create({
            name: "customFormat",
            addCommands() {
                return {
                    setCustomFormat:
                        (format: CustomFormat) =>
                        ({ chain, state }) => {
                            const { selection } = state;
                            const nodeType =
                                state.selection.$from.parent.type.name;
                            if (
                                nodeType === "paragraph" ||
                                nodeType === "heading"
                            ) {
                                const classString =
                                    format.classes?.join(" ") || "";
                                const styleString = format.styles
                                    ? Object.entries(format.styles)
                                          .map(([k, v]) => `${k}:${v}`)
                                          .join(";")
                                    : "";
                                const attrs: Record<string, string> = {};
                                if (classString) attrs.class = classString;
                                if (styleString) attrs.style = styleString;
                                return chain()
                                    .updateAttributes(nodeType, attrs)
                                    .run();
                            }
                            return false;
                        },
                };
            },
        }),
    ],
};

export default customFormat;
