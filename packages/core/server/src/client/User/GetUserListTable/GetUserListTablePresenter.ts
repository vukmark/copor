import {GetUserDTO} from '@copor/core/domain/User/interactor/dto/GetUserDTO';
import i18next from 'i18next';
import {PaginatedTablePresenter} from '@copor/core/client/Core/Table/presenter/TablePresenter';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {ActionCell, CopyableTextCell, GroupListCell, TableCell, TextCell} from '@copor/core/client/Core/Table/TableCell';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import {UserEditAction} from '@copor/core/client/User/GetUserListTable/GetUserListTableHelpers/UserEditAction';
import {UserPermissionsAction} from '@copor/core/client/User/GetUserListTable/GetUserListTableHelpers/UserPermissionsAction';
import {ToggleActiveAction} from '@copor/core/client/User/GetUserListTable/GetUserListTableHelpers/ToggleActiveAction';
import {Alignment} from '@copor/core/client/Core/Table/enum/Alignment';

export class GetUserListTablePresenter extends PaginatedTablePresenter<GetUserDTO> {
	private readonly canShowEditActions: boolean;

	constructor(
		input: GetUserDTO[],
		appContext: AppContext,
		paginationParams: PaginationParams,
		canShowEditActions: boolean
	) {
		super(input, appContext, paginationParams);
		this.canShowEditActions = canShowEditActions;
	}

	protected getHeader(): ColumnHeaderDTO[] {
		i18next.setDefaultNamespace('user');
		const header: ColumnHeaderDTO[] = [
			{name: i18next.t('translationStringList.FIRST_NAME'), sortKey: 'SORT_BY_NAME'},
			{name: i18next.t('translationStringList.LAST_NAME'), sortKey: 'SORT_BY_SURNAME', defaultSortDir: 'asc'},
			{name: i18next.t('translationStringList.USER_NAME'), sortKey: 'SORT_BY_USERNAME'},
			{name: i18next.t('translationStringList.ROLE'), sortKey: 'SORT_BY_ROLE'},
			{name: i18next.t('translationStringList.GROUPS'), sortKey: 'SORT_BY_GROUP'}
		];

		if (this.canShowEditActions) {
			header.push({name: i18next.t('translationStringList.IS_ACTIVE'), fixedWidth: 90, alignment: Alignment.right});
			header.push({name: i18next.t('translationStringList.ACTIONS'), fixedWidth: 120, alignment: Alignment.right});
		}
		return header;
	}

	protected getActions(): RowAction[] {
		if (!this.canShowEditActions) {
			return [];
		}

		return [new UserPermissionsAction(), new UserEditAction()];
	}

	protected getRowCells(item: GetUserDTO): TableCell[] {
		i18next.setDefaultNamespace('role');
		const rowCells: TableCell[] = [
			new TextCell(item.firstName),
			new TextCell(item.lastName),
			new CopyableTextCell(item.userName),
			new TextCell(i18next.t(item.role)),
			new GroupListCell(item.groupList ?? {userGroupList: []})
		];

		if (this.canShowEditActions) {
			rowCells.push(new ActionCell([new ToggleActiveAction(item.isActive)], item.id));
			rowCells.push(new ActionCell(this.getActions(), item.id));
		}

		return rowCells;
	}
}
