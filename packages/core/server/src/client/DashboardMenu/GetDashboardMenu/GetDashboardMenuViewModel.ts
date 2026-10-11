export interface DashboardItemViewModel {
	icon: string;
	title: string;
	route: string;
	isExternalLink?: boolean;
	badgeCount?: number;
}

export interface DashboardCategoryViewModel {
	title: string;
	items: DashboardItemViewModel[];
}

export interface GetDashboardMenuViewModel {
	categories: DashboardCategoryViewModel[];
}
