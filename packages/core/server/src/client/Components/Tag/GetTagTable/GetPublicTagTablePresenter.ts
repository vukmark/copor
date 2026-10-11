import {PaginatedTablePresenter} from '@copor/core/client/Core/Table/presenter/TablePresenter';
import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import i18next from 'i18next';
import {ActionCell, ColorCell, TableCell, TextCell} from '@copor/core/client/Core/Table/TableCell';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {EditAction} from '@copor/core/client/Core/Table/row_actions/EditAction';
import {RemoveAction} from '@copor/core/client/Core/Table/row_actions/RemoveAction';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {ColumnSize} from '@copor/core/client/Core/Table/enum/ColumnSize';
import {Alignment} from '@copor/core/client/Core/Table/enum/Alignment';

export class GetPublicTagTablePresenter extends PaginatedTablePresenter<GetTagDTO> {
	protected getHeader() : ColumnHeaderDTO[] {
		i18next.setDefaultNamespace('tag');
		return [
			{name: i18next.t('translationStringList.TAG'), size: ColumnSize.col8, sortKey: 'SORT_BY_NAME', defaultSortDir: 'asc'},
			{name: i18next.t('translationStringList.DESCRIPTION'), size: ColumnSize.col16},
			{name: i18next.t('translationStringList.COLOR'), fixedWidth: 110},
			{name: i18next.t('translationStringList.ACTIONS'), fixedWidth: 110, alignment: Alignment.right}
		];
	}

	protected getRowCells(tag: GetTagDTO) : TableCell[] {
		return [
			new TextCell(tag.name),
			new TextCell(tag.description ?? ''),
			new ColorCell(tag.color),
			new ActionCell(this.getActions(), tag.id)
		];
	}

	protected getActions(): RowAction[] {
		i18next.setDefaultNamespace('tag');
		return [
			new EditAction('tag'),
			new RemoveAction('tag')
		];
	}
}
