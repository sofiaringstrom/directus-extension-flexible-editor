import { defineDisplay } from "@directus/extensions-sdk";
import component from "./display.vue";

export default defineDisplay({
    id: "flexible-editor-ay-display",
    name: "Flexible Editor AY",
    icon: "description",
    description: "Display the content of Flexible Editor AY as plain text.",
    component,
    options: null,
    types: ["json"],
});
