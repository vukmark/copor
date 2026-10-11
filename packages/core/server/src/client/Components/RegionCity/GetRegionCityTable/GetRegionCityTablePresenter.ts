import {PaginatedTablePresenter} from '@copor/core/client/Core/Table/presenter/TablePresenter';
import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import i18next from 'i18next';
import {ActionCell, TableCell, TextCell} from '@copor/core/client/Core/Table/TableCell';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {EditAction} from '@copor/core/client/Core/Table/row_actions/EditAction';
import {RemoveAction} from '@copor/core/client/Core/Table/row_actions/RemoveAction';
import {GetRegionCityViewModel} from '@copor/core/client/Components/RegionCity/GetRegionCity/GetRegionCityViewModel';
import {Alignment} from '@copor/core/client/Core/Table/enum/Alignment';

export class GetRegionCityTablePresenter extends PaginatedTablePresenter<GetRegionCityViewModel> {
	protected getHeader(): ColumnHeaderDTO[] {
		i18next.setDefaultNamespace('region');

		return [
			{name: i18next.t('translationStringList.CITY'), sortKey: 'SORT_BY_CITY'},
			{name: i18next.t('translationStringList.PROVINCE')},
			{name: i18next.t('translationStringList.PROVINCE_CODE')},
			{name: i18next.t('translationStringList.COMMUNITY')},
			{name: i18next.t('translationStringList.COMMUNITY_CODE')},
			{name: i18next.t('translationStringList.LATITUDE')},
			{name: i18next.t('translationStringList.LONGITUDE')},
			{name: i18next.t('translationStringList.ACTIONS'), fixedWidth: 110, alignment: Alignment.right}
		];
	}

	protected getRowCells(item: GetRegionCityViewModel): TableCell[] {
		return [
			new TextCell(item.city),
			new TextCell(item.province ?? ''),
			new TextCell(item.provinceCode ?? ''),
			new TextCell(item.community ?? ''),
			new TextCell(item.communityCode ?? ''),
			new TextCell(item.latitude?.toString() ?? ''),
			new TextCell(item.longitude?.toString() ?? ''),
			new ActionCell(this.getActions(), item.id)
		];
	}

	protected getActions(): RowAction[] {
		i18next.setDefaultNamespace('region');

		return [
			new EditAction('region-city'),
			new RemoveAction('region-city')
		];
	}
}