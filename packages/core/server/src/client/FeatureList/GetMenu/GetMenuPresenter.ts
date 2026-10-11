import i18next from 'i18next';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetFeatureListDTO} from '@copor/core/domain/FeatureList/interactor/dto/GetFeatureListDTO';
import {Feature} from '@copor/core/domain/FeatureList/enum/Feature';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {getFeatureDefinitions} from '@copor/core/domain/FeatureList/FeatureRegistry';
import {GetMenuViewModel, MenuItemViewModel} from './GetMenuViewModel';

interface MenuItemDefinition {
	icon: string;
	labelKey: string;
	route?: string;
	isExternalLink?: boolean;
	feature?: Feature;
	children?: MenuItemDefinition[];
}

// Built from the registered features' `menuItem`, so a module brings its own
// menu entry. An item is only sent when the user's permissions unlock its feature.
function getMenuDefinition(): MenuItemDefinition[] {
	return getFeatureDefinitions()
		.filter((definition) => definition.menuItem)
		.sort((a, b) => a.menuItem!.order - b.menuItem!.order)
		.map((definition) => ({
			icon: definition.menuItem!.icon,
			labelKey: definition.menuItem!.labelKey,
			route: definition.key,
			feature: definition.key
		}));
}

export class GetMenuPresenter extends PresenterInstance<GetFeatureListDTO, GetMenuViewModel> {
	private readonly actorRole: RoleType;

	constructor(input: GetFeatureListDTO, context: AppContext, actorRole: RoleType) {
		super(input, context);
		this.actorRole = actorRole;
	}

	present(): GetMenuViewModel {
		i18next.setDefaultNamespace('common');
		return {
			menuList: this.buildItems(getMenuDefinition())
		};
	}

	private buildItems(definitions: MenuItemDefinition[]): MenuItemViewModel[] {
		const items: MenuItemViewModel[] = [];

		for (const definition of definitions) {
			const childDefinitions = definition.children ?? [];
			const children = this.buildItems(childDefinitions);

			// A parent item is only useful if at least one child survived filtering
			if (childDefinitions.length > 0 && children.length === 0)
				continue;
			if (childDefinitions.length === 0 && !this.isEnabled(definition.feature))
				continue;

			items.push({
				icon: definition.icon,
				label: i18next.t(`translationStringList.${definition.labelKey}`),
				route: definition.route ?? null,
				isExternalLink: definition.isExternalLink,
				children
			});
		}

		return items;
	}

	private isEnabled(feature?: Feature): boolean {
		if (!feature)
			return false;
		return this.input.featureList.includes(feature);
	}
}
