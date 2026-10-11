import {PaginatedTablePresenter} from '@copor/core/client/Core/Table/presenter/TablePresenter';
import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import i18next from 'i18next';
import {ActionCell, PublishStatusCell, TableCell, TextCell} from '@copor/core/client/Core/Table/TableCell';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {EditAction} from '@copor/core/client/Core/Table/row_actions/EditAction';
import {RemoveAction} from '@copor/core/client/Core/Table/row_actions/RemoveAction';
import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';

export class GetCountryTablePresenter extends PaginatedTablePresenter<GetCountryDTO> {
	protected getHeader() : ColumnHeaderDTO[] {
		i18next.setDefaultNamespace('country');
		return [
			{name: i18next.t('translationStringList.COUNTRY'), sortKey: 'SORT_BY_NAME', defaultSortDir: 'asc'},
			{name: i18next.t('translationStringList.CODE'), fixedWidth: 110},
			{name: i18next.t('translationStringList.STATUS'), fixedWidth: 110},
			{name: i18next.t('translationStringList.ACTIONS'), fixedWidth: 110}
		];
	}

	protected getRowCells(country: GetCountryDTO) : TableCell[] {
		return [
			new TextCell(country.name),
			new TextCell(country.code),
			new PublishStatusCell(country.publishStatus),
			new ActionCell(this.getActions(), country.id)
		];
	}

	protected getActions(): RowAction[] {
		i18next.setDefaultNamespace('country');
		return [
			new EditAction('country'),
			new RemoveAction('country')
		];
	}
}
