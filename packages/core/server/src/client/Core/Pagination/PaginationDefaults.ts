// Applied by list repos whose result set can otherwise grow unbounded
// (e.g. every user, every contact) when a caller omits limit/offset —
// a request-body oversight elsewhere shouldn't turn into a full table scan.
export const DEFAULT_LIST_LIMIT = 100;
export const DEFAULT_LIST_OFFSET = 0;
