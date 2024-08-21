export function useCurrentDocument(): string | undefined {
    const route = useRoute();
    return route.path.split("/").filter(Boolean).pop();
}