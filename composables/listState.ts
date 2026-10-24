// What a catalog / blog list shows. A failed CMS request is not an empty list: "unavailable" tells visitors
// to come back later, "empty" means the CMS really has nothing published.
export type ListState = "list" | "unavailable" | "noFilteredResults" | "empty";

export function listState({
    count,
    failed,
    hasFilters,
}: {
    count: number;
    failed: boolean;
    hasFilters: boolean;
}): ListState {
    if (count > 0) return "list";
    if (failed) return "unavailable";
    if (hasFilters) return "noFilteredResults";
    return "empty";
}
