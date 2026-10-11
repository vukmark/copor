import {PaginatedTablePresenter} from '@copor/core/client/Core/Table/presenter/TablePresenter';
import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import i18next from 'i18next';
import {ActionCell, TableCell, TextCell} from '@copor/core/client/Core/Table/TableCell';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {EditAction} from '@copor/core/client/Core/Table/row_actions/EditAction';
import {RemoveAction} from '@copor/core/client/Core/Table/row_actions/RemoveAction';
import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';

export class GetRegionTablePresenter extends PaginatedTablePresenter<GetRegionDTO> {
	protected getHeader() : ColumnHeaderDTO[] {
		i18next.setDefaultNamespace('region');
		return [
			{name: i18next.t('translationStringList.COUNTRY')},
			{name: i18next.t('translationStringList.STATE')},
			{name: i18next.t('translationStringList.CITY')},
			{name: i18next.t('translationStringList.POSTAL_CODE'), sortKey: 'SORT_BY_NAME', defaultSortDir: 'asc'},
			{name: i18next.t('translationStringList.ACTIONS'), fixedWidth: 110}
		];
	}

	protected getRowCells(region: GetRegionDTO) : TableCell[] {
		return [
			new TextCell(region.country.name),
			new TextCell(region.state.name),
			new TextCell(region.cityList.join(', ')),
			new TextCell(region.postalCode),
			new ActionCell(this.getActions(), region.id)
		];
	}

	protected getActions(): RowAction[] {
		i18next.setDefaultNamespace('region');
		return [
			new EditAction('region'),
			new RemoveAction('region')
		];
	}
}
