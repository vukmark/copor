import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {
	GetPermissionTreeDTO,
	GetPermissionTreePresenter
} from '@copor/core/client/Components/Permission/GetPermissionTree/GetPermissionTreePresenter';
import {PermissionGroupViewModel} from './PermissionGroupViewModel';
import {SearchPermissionTreeViewModel} from './SearchPermissionTreeViewModel';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';

export interface SearchPermissionTreePresenterInput extends GetPermissionTreeDTO {
	filterList: GetFilterDTO[];
}

export class SearchPermissionTreePresenter
	extends PresenterInstance<SearchPermissionTreePresenterInput, SearchPermissionTreeViewModel> {
	private readonly paginationParams: PaginationParams;

	constructor(
		input: SearchPermissionTreePresenterInput,
		context: AppContext,
		paginationParams: PaginationParams
	) {
		super(input, context);
		this.paginationParams = paginationParams;
	}

	public present(): SearchPermissionTreeViewModel {
		const tree = new GetPermissionTreePresenter(this.input, this.appContext).present();
		const searchValue = this.input.filterList
			.find((filter) => filter.name === FilterNameValues.SEARCH as string)
			?.values?.[0]
			?.trim()
			.toLocaleLowerCase();
		const roleList = searchValue
			? tree.roleList.filter((role) => role.name.toLocaleLowerCase().includes(searchValue))
			: tree.roleList;
		const userGroupTree = searchValue
			? tree.userGroupTree
				.map((group) => this.filterGroup(group, searchValue))
				.filter((group): group is PermissionGroupViewModel => group !== undefined)
			: tree.userGroupTree;
		const offset = this.parsePaginationValue(this.paginationParams.offset, 0);
		const limit = this.parsePaginationValue(
			this.paginationParams.limit,
			roleList.length + userGroupTree.length
		);
		const paginatedRoleList = roleList.slice(offset, offset + limit);
		const groupOffset = Math.max(0, offset - roleList.length);
		const remainingLimit = Math.max(0, limit - paginatedRoleList.length);

		return {
			roleList: paginatedRoleList,
			userGroupTree: userGroupTree.slice(groupOffset, groupOffset + remainingLimit),
			limit: this.paginationParams.limit,
			offset: this.paginationParams.offset
		};
	}

	private filterGroup(
		group: PermissionGroupViewModel,
		searchValue: string
	): PermissionGroupViewModel | undefined {
		if (group.name.toLocaleLowerCase().includes(searchValue)) {
			return group;
		}

		const children = group.children
			.map((child) => this.filterGroup(child, searchValue))
			.filter((child): child is PermissionGroupViewModel => child !== undefined);

		return children.length > 0 ? {...group, children} : undefined;
	}

	private parsePaginationValue(value: string | undefined, fallback: number): number {
		if (value === undefined) {
			return fallback;
		}

		const parsedValue = Number.parseInt(value, 10);

		return Number.isNaN(parsedValue) || parsedValue < 0 ? fallback : parsedValue;
	}
}
