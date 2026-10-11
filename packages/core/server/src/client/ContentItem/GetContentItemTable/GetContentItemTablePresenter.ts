import {PaginatedTablePresenter} from '@copor/core/client/Core/Table/presenter/TablePresenter';
import {GetContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/GetContentItemDTO';
import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import i18next from 'i18next';
import {
	ActionCell,
	DateCell,
	PublishStatusCell,
	TableCell,
	TextCell
} from '@copor/core/client/Core/Table/TableCell';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {EditAction} from '@copor/core/client/Core/Table/row_actions/EditAction';
import {RemoveAction} from '@copor/core/client/Core/Table/row_actions/RemoveAction';
import {Alignment} from '@copor/core/client/Core/Table/enum/Alignment';

export class GetContentItemTablePresenter
	extends PaginatedTablePresenter<GetContentItemDTO> {
	protected getHeader(): ColumnHeaderDTO[] {
		i18next.setDefaultNamespace('form');
		return [
			{name: i18next.t('translationStringList.TITLE'), sortKey: 'SORT_BY_NAME', defaultSortDir: 'asc'},
			{name: i18next.t('translationStringList.SUMMARY')},
			{name: i18next.t('translationStringList.CONTENT_TYPE')},
			{name: i18next.t('translationStringList.PUBLISH_DATE')},
			{name: i18next.t('translationStringList.PUBLISH_STATUS'), fixedWidth: 110},
			{name: i18next.t('translationStringList.ACTIONS'), fixedWidth: 110, alignment: Alignment.right}
		];
	}

	protected getRowCells(contentItem: GetContentItemDTO): TableCell[] {
		i18next.setDefaultNamespace('form');
		return [
			new TextCell(contentItem.title),
			new TextCell(contentItem.summary),
			new TextCell(contentItem.contentType),
			new DateCell(contentItem.publishDate.toISOString()),
			new PublishStatusCell(contentItem.publishStatus),
			new ActionCell(this.getActions(), contentItem.id)
		];
	}

	protected getActions(): RowAction[] {
		i18next.setDefaultNamespace('form');
		return [
			new EditAction('content-item'),
			new RemoveAction('content-item')
		];
	}
}