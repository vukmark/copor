import {PaginatedTablePresenter} from '@copor/core/client/Core/Table/presenter/TablePresenter';
import {GetUserDeletionRequestDTO} from '@copor/core/domain/User/interactor/dto/GetUserDeletionRequestDTO';
import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import i18next from 'i18next';
import {ActionCell, CopyableTextCell, TableCell, TextCell} from '@copor/core/client/Core/Table/TableCell';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {RemoveAction} from '@copor/core/client/Core/Table/row_actions/RemoveAction';
import {Alignment} from '@copor/core/client/Core/Table/enum/Alignment';

export class GetUserDeletionRequestListTablePresenter extends PaginatedTablePresenter<GetUserDeletionRequestDTO> {
	protected getHeader(): ColumnHeaderDTO[] {
		i18next.setDefaultNamespace('user');
		return [
			{name: i18next.t('translationStringList.FIRST_NAME')},
			{name: i18next.t('translationStringList.LAST_NAME')},
			{name: i18next.t('translationStringList.USER_NAME')},
			{name: i18next.t('translationStringList.ROLE')},
			{name: i18next.t('translationStringList.ACTIONS'), fixedWidth: 120, alignment: Alignment.right}
		];
	}

	protected getActions(): RowAction[] {
		return [new RemoveAction('user')];
	}

	protected getRowCells(item: GetUserDeletionRequestDTO): TableCell[] {
		i18next.setDefaultNamespace('role');
		const rowCells: TableCell[] = [
			new TextCell(item.userFirstName ?? ''),
			new TextCell(item.userLastName ?? ''),
			new CopyableTextCell(item.username ?? ''),
			new TextCell(item.userRoleType ? i18next.t(item.userRoleType) : '')
		];

		rowCells.push(new ActionCell(this.getActions(), item.id));

		return rowCells;
	}
}
