import i18next from 'i18next';
import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetFeatureListDTO} from '@copor/core/domain/FeatureList/interactor/dto/GetFeatureListDTO';
import {Feature} from '@copor/core/domain/FeatureList/enum/Feature';
import {CoreFeature} from '@copor/core/domain/FeatureList/enum/CoreFeature';
import {DashboardCategory} from '@copor/core/domain/FeatureList/enum/DashboardCategory';
import {getFeatureDefinitions} from '@copor/core/domain/FeatureList/FeatureRegistry';
import {GetDashboardMenuViewModel, DashboardItemViewModel} from './GetDashboardMenuViewModel';

export interface GetDashboardMenuPresenterInputDTO extends GetFeatureListDTO {
	notificationNumber?: number;
}

interface DashboardItemDefinition {
	icon: string;
	titleKey: string;
	route: string;
	feature?: Feature;
	isExternalLink?: boolean;
}

interface DashboardCategoryDefinition {
	titleKey: string;
	items: DashboardItemDefinition[];
}

// Built from the registered features' `dashboardItem`, so a module brings its
// own dashboard entry. Categories keep DashboardCategory's order, items their
// `order`; an item is only sent when the user's permissions unlock its feature.
function getDashboardMenuDefinition(): DashboardCategoryDefinition[] {
	const definitions = getFeatureDefinitions()
		.filter((definition) => definition.dashboardItem)
		.sort((a, b) => a.dashboardItem!.order - b.dashboardItem!.order);

	return Object.values(DashboardCategory).map((category) => ({
		titleKey: category,
		items: definitions
			.filter((definition) => definition.dashboardItem!.category === category)
			.map((definition) => ({
				icon: definition.dashboardItem!.icon,
				titleKey: definition.dashboardItem!.titleKey,
				route: definition.key,
				feature: definition.key
			}))
	}));
}

export class GetDashboardMenuPresenter extends PresenterInstance<GetDashboardMenuPresenterInputDTO, GetDashboardMenuViewModel> {
	present(): GetDashboardMenuViewModel {
		i18next.setDefaultNamespace('common');

		const categories = getDashboardMenuDefinition()
			.map((category) => ({
				title: i18next.t(`translationStringList.${category.titleKey}`),
				items: this.buildItems(category.items)
			}))
			.filter((category) => category.items.length > 0);

		return {categories};
	}

	private buildItems(definitions: DashboardItemDefinition[]): DashboardItemViewModel[] {
		return definitions
			.filter((definition) => this.isEnabled(definition.feature))
			.map((definition) => ({
				icon: definition.icon,
				title: i18next.t(`translationStringList.${definition.titleKey}`),
				route: definition.route,
				isExternalLink: definition.isExternalLink,
				badgeCount: definition.feature === CoreFeature.ADMINISTRATION_DELETION_REQUESTS && this.input.notificationNumber
					? this.input.notificationNumber
					: undefined
			}));
	}

	private isEnabled(feature?: Feature): boolean {
		if (!feature)
			return false;

		return this.input.featureList.includes(feature);
	}
}
