import {GetMenuPresenter} from '@copor/core/client/FeatureList/GetMenu/GetMenuPresenter';
import {GetDashboardMenuPresenter} from '@copor/core/client/DashboardMenu/GetDashboardMenu/GetDashboardMenuPresenter';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {Feature} from '@copor/core/domain/FeatureList/enum/Feature';
import {DashboardCategory} from '@copor/core/domain/FeatureList/enum/DashboardCategory';
import {registerFeatureDefinitions} from '@copor/core/domain/FeatureList/FeatureRegistry';

// A module's menu and dashboard entries sort in among core's by `order`.
// Only core's features and this sample's are unlocked, so whatever modules
// the app registers stay out of the result.
registerFeatureDefinitions('menu_sample', [
	{key: '/menu-sample', menuItem: {icon: 'sample', labelKey: 'MENU_SAMPLE', order: 35}},
	{key: '/administration/menu-sample', dashboardItem: {category: DashboardCategory.ADMINISTRATION, icon: 'sample', titleKey: 'MENU_SAMPLE', order: 15}}
]);

// Every feature that can appear in a menu, as route paths (the API contract).
const allFeatures = [
	'/menu-sample', '/ai-assistance', '/administration-dashboard',
	'/administration/role', '/administration/user', '/administration/user-groups',
	'/administration/contract-type', '/administration/menu-sample', '/administration/content-item',
	'/administration/tag', '/administration/log', '/administration/state', '/administration/region-city',
	'/administration/language', '/administration/native-language', '/administration/tenant',
	'/administration/deletion-requests', '/administration/permissions', '/administration/system-settings'
] as Feature[];
const context = {} as AppContext;

describe('GetMenuPresenter', () => {
	it('lists every unlocked menu item in order', () => {
		const result = new GetMenuPresenter({featureList: allFeatures}, context, RoleType.USER).present();

		expect(result.menuList.map((item) => [item.route, item.icon])).toEqual([
			['/ai-assistance', 'robotAstromech'],
			['/menu-sample', 'sample'],
			['/administration-dashboard', 'userShield']
		]);
	});

	it('leaves out items whose feature is not unlocked', () => {
		const result = new GetMenuPresenter({featureList: ['/ai-assistance'] as Feature[]}, context, RoleType.USER).present();

		expect(result.menuList.map((item) => item.route)).toEqual(['/ai-assistance']);
	});
});

describe('GetDashboardMenuPresenter', () => {
	it('lists every unlocked item, grouped by category, in order', () => {
		const result = new GetDashboardMenuPresenter({featureList: allFeatures, notificationNumber: 3}, context).present();

		// Categories in order: users, administration, educational contents, system.
		expect(result.categories.map((category) => category.items.map((item) => [item.route, item.icon, item.badgeCount]))).toEqual([
			[
				['/administration/role', 'shieldCheck', undefined],
				['/administration/user', 'user', undefined],
				['/administration/user-groups', 'userGroup', undefined]
			],
			[
				['/administration/contract-type', 'fileLines', undefined],
				['/administration/menu-sample', 'sample', undefined],
				['/administration/content-item', 'book', undefined]
			],
			[
				['/administration/tag', 'tag', undefined]
			],
			[
				['/administration/log', 'clockRotateLeft', undefined],
				['/administration/state', 'map', undefined],
				['/administration/region-city', 'city', undefined],
				['/administration/language', 'globe', undefined],
				['/administration/native-language', 'globe', undefined],
				['/administration/tenant', 'book', undefined],
				['/administration/deletion-requests', 'trash', 3],
				['/administration/permissions', 'shieldKeyhole', undefined],
				['/administration/system-settings', 'gear', undefined]
			]
		]);
	});

	it('drops categories with no unlocked item', () => {
		const result = new GetDashboardMenuPresenter({featureList: ['/administration/tag'] as Feature[]}, context).present();

		expect(result.categories.map((category) => category.items.map((item) => item.route))).toEqual([['/administration/tag']]);
	});
});
