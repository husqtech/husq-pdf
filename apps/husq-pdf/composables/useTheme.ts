import { computed, onMounted, ref } from "vue";

export enum Theme {
    LIGHT = "light",
    DARK = "dark",
}

const LOCAL_STORAGE_KEY = "__hqpdf_theme";
const theme = ref<Theme>(Theme.LIGHT);

const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
    if (newTheme === Theme.DARK) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
};

const toggleTheme = () => {
    setTheme(theme.value === Theme.DARK ? Theme.LIGHT : Theme.DARK);
};

export function useTheme() {
    onMounted(() => {
        const savedTheme = localStorage.getItem(
            LOCAL_STORAGE_KEY,
        ) as Theme | null;
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches;
            setTheme(prefersDark ? Theme.DARK : Theme.LIGHT);
        }
    });

    const currentTheme = computed(() => theme.value);
    return {
        currentTheme,
        toggleTheme,
    };
}