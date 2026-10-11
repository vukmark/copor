export interface MenuItemViewModel {
	icon: string;
	label: string;
	route: string | null;
	isExternalLink?: boolean;
	children: MenuItemViewModel[];
}

export interface GetMenuViewModel {
	menuList: MenuItemViewModel[];
}
