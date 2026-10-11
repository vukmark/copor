export interface PaginatedResponse<T> {
	items: T[];
	limit?: string;
	offset?: string;
}