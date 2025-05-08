import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";

export const CustomParagraph = Paragraph.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: undefined,
                renderHTML: (attributes) =>
                    attributes.class ? { class: attributes.class } : {},
            },
            style: {
                default: undefined,
                renderHTML: (attributes) =>
                    attributes.style ? { style: attributes.style } : {},
            },
        };
    },
});

export const CustomHeading = Heading.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: undefined,
                renderHTML: (attributes) =>
                    attributes.class ? { class: attributes.class } : {},
            },
            style: {
                default: undefined,
                renderHTML: (attributes) =>
                    attributes.style ? { style: attributes.style } : {},
            },
        };
    },
});
