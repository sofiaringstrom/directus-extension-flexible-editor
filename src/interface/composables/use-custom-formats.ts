import { ref, watch } from "vue";

interface CustomFormat {
    name: string;
    tag: string;
    classes: string[];
    styles: Record<string, string>;
}

export function useCustomFormats() {
    const customFormats = ref<CustomFormat[]>([]);
    const formatUrl = ref<string>("");
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const fetchCustomFormats = async (url: string) => {
        if (!url) {
            customFormats.value = [];
            return;
        }

        isLoading.value = true;
        error.value = null;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch formats: ${response.statusText}`
                );
            }
            const data = await response.json();
            customFormats.value = data;
        } catch (err) {
            error.value =
                err instanceof Error
                    ? err.message
                    : "Failed to fetch custom formats";
            customFormats.value = [];
        } finally {
            isLoading.value = false;
        }
    };

    watch(formatUrl, (newUrl) => {
        if (newUrl) {
            fetchCustomFormats(newUrl);
        }
    });

    return {
        customFormats,
        formatUrl,
        isLoading,
        error,
        fetchCustomFormats,
    };
}
