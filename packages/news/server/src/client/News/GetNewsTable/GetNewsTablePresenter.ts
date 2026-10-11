import {PaginatedTablePresenter} from '@copor/core/client/Core/Table/presenter/TablePresenter';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';
import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import i18next from 'i18next';
import {ActionCell, DateCell, PublishStatusCell, RoleCell, TableCell, TextCell} from '@copor/core/client/Core/Table/TableCell';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {EditAction} from '@copor/core/client/Core/Table/row_actions/EditAction';
import {RemoveAction} from '@copor/core/client/Core/Table/row_actions/RemoveAction';

export class GetNewsTablePresenter
	extends PaginatedTablePresenter<GetNewsDTO> {
	protected getHeader(): ColumnHeaderDTO[] {
		i18next.setDefaultNamespace('form');
		return [
			{name: i18next.t('translationStringList.TITLE'), sortKey: 'SORT_BY_NAME', defaultSortDir: 'asc'},
			{name: i18next.t('translationStringList.SUMMARY')},
			{name: i18next.t('translationStringList.CONTENT')},
			{name: i18next.t('translationStringList.PUBLISH_DATE')},
			{name: i18next.t('translationStringList.ROLE')},
			{name: i18next.t('translationStringList.PUBLISH_STATUS')},
			{name: i18next.t('translationStringList.ACTIONS'), fixedWidth: 110}
		];
	}

	protected getRowCells(news: GetNewsDTO): TableCell[] {
		i18next.setDefaultNamespace('form');
		return [
			new TextCell(news.title),
			new TextCell(news.summary),
			new TextCell(news.content),
			new DateCell(news.publishDate.toISOString()),
			new RoleCell(news.role.map((role) => role.type)),
			new PublishStatusCell(news.publishStatus),
			new ActionCell(this.getActions(), news.id)
		];
	}

	protected getActions(): RowAction[] {
		i18next.setDefaultNamespace('form');
		return [
			new EditAction('news'),
			new RemoveAction('news')
		];
	}
}