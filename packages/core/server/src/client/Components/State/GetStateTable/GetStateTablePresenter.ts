import {PaginatedTablePresenter} from '@copor/core/client/Core/Table/presenter/TablePresenter';
import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import i18next from 'i18next';
import {ActionCell, TableCell, TextCell} from '@copor/core/client/Core/Table/TableCell';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {EditAction} from '@copor/core/client/Core/Table/row_actions/EditAction';
import {RemoveAction} from '@copor/core/client/Core/Table/row_actions/RemoveAction';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {ColumnSize} from '@copor/core/client/Core/Table/enum/ColumnSize';
import {Alignment} from '@copor/core/client/Core/Table/enum/Alignment';

export class GetStateTablePresenter extends PaginatedTablePresenter<GetStateDTO> {
	protected getHeader() : ColumnHeaderDTO[] {
		i18next.setDefaultNamespace('state');
		return [
			{name: i18next.t('translationStringList.NAME'), size: ColumnSize.col8, sortKey: 'SORT_BY_NAME', defaultSortDir: 'asc'},
			{name: i18next.t('translationStringList.CODE'), size: ColumnSize.col4},
			{name: i18next.t('translationStringList.ACTIONS'), fixedWidth: 110, alignment: Alignment.right}
		];
	}

	protected getRowCells(state: GetStateDTO) : TableCell[] {
		return [
			new TextCell(state.name),
			new TextCell(state.code),
			new ActionCell(this.getActions(), state.id)
		];
	}

	protected getActions(): RowAction[] {
		i18next.setDefaultNamespace('state');
		return [
			new EditAction('state'),
			new RemoveAction('state')
		];
	}
}
