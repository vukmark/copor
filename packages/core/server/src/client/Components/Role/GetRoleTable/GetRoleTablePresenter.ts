import {PaginatedTablePresenter} from '@copor/core/client/Core/Table/presenter/TablePresenter';
import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import i18next from 'i18next';
import {ActionCell, TableCell, TextCell} from '@copor/core/client/Core/Table/TableCell';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {EditAction} from '@copor/core/client/Core/Table/row_actions/EditAction';
import {RemoveAction} from '@copor/core/client/Core/Table/row_actions/RemoveAction';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {Alignment} from '@copor/core/client/Core/Table/enum/Alignment';

export class GetRoleTablePresenter extends PaginatedTablePresenter<GetRoleDTO> {
	protected getHeader() : ColumnHeaderDTO[] {
		i18next.setDefaultNamespace('role');
		return [
			{name: i18next.t('translationStringList.ROLE_NAME'), sortKey: 'SORT_BY_NAME', defaultSortDir: 'asc'},
			{name: i18next.t('translationStringList.ROLE_TYPE')},
			{name: i18next.t('translationStringList.ACTIONS'), fixedWidth: 110, alignment: Alignment.right}
		];
	}

	protected getRowCells(role: GetRoleDTO) : TableCell[] {
		i18next.setDefaultNamespace('role');
		return [
			new TextCell(role.name),
			new TextCell(i18next.t('translationStringList.' + role.type)),
			new ActionCell(this.getActions(), role.id)
		];
	}

	protected getActions(): RowAction[] {
		i18next.setDefaultNamespace('role');
		return [
			new EditAction('role'),
			new RemoveAction('role')
		];
	}
}
