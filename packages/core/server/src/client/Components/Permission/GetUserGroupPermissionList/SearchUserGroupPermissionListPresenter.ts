import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {
	FeatureScopedPermissionViewModel
} from '@copor/core/client/Components/Permission/GetRolePermissionList/FeatureScopedPermissionViewModel';
import {FeatureScopedPermissionPresenter} from '@copor/core/client/Core/Presenter/FeatureScopedPermissionPresenter';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';

export interface SearchUserGroupPermissionListPresenterInput {
	permissionList: ScopedPermission[];
	filterList: GetFilterDTO[];
}

export class SearchUserGroupPermissionListPresenter
	extends PresenterInstance<
		SearchUserGroupPermissionListPresenterInput,
		PaginatedResponse<FeatureScopedPermissionViewModel>
	> {
	private readonly paginationParams: PaginationParams;

	constructor(
		input: SearchUserGroupPermissionListPresenterInput,
		context: AppContext,
		paginationParams: PaginationParams
	) {
		super(input, context);
		this.paginationParams = paginationParams;
	}

	public present(): PaginatedResponse<FeatureScopedPermissionViewModel> {
		const featureList = new FeatureScopedPermissionPresenter(
			this.input.permissionList,
			this.appContext
		).present();
		const searchValue = this.input.filterList
			.find((filter) => filter.name === FilterNameValues.SEARCH as string)
			?.values?.[0]
			?.trim()
			.toLocaleLowerCase();
		const filteredFeatureList = searchValue
			? featureList
				.map((item) => this.filterFeatureBySearch(item, searchValue))
				.filter((item): item is FeatureScopedPermissionViewModel => item !== null)
			: featureList;
		const offset = this.parsePaginationValue(this.paginationParams.offset, 0);
		const limit = this.parsePaginationValue(
			this.paginationParams.limit,
			filteredFeatureList.length
		);

		return {
			items: filteredFeatureList.slice(offset, offset + limit),
			limit: this.paginationParams.limit,
			offset: this.paginationParams.offset
		};
	}

	// When the feature name itself matches, keep every permission under it
	// (that's the expected "expand the whole category" search result). When
	// only some permissions match, only those should surface — otherwise a
	// hit on "About > C" would also drag in the unrelated "About > A/B" rows.
	private filterFeatureBySearch(
		item: FeatureScopedPermissionViewModel,
		searchValue: string
	): FeatureScopedPermissionViewModel | null {
		if (item.feature.name.toLocaleLowerCase().includes(searchValue)) {
			return item;
		}

		const matchingPermissionList = item.permissionList.filter((permission) => permission.translation
			.toLocaleLowerCase()
			.includes(searchValue));

		if (matchingPermissionList.length === 0) {
			return null;
		}

		return {
			...item,
			permissionList: matchingPermissionList
		};
	}

	private parsePaginationValue(value: string | undefined, fallback: number): number {
		if (value === undefined) {
			return fallback;
		}

		const parsedValue = Number.parseInt(value, 10);

		return Number.isNaN(parsedValue) || parsedValue < 0 ? fallback : parsedValue;
	}
}
