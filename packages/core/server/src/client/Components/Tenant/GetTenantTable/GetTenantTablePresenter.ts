import {PaginatedTablePresenter} from '@copor/core/client/Core/Table/presenter/TablePresenter';
import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import i18next from 'i18next';
import {ActionCell, IsCheckedCell, TableCell, TextCell} from '@copor/core/client/Core/Table/TableCell';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {EditAction} from '@copor/core/client/Core/Table/row_actions/EditAction';
import {RemoveAction} from '@copor/core/client/Core/Table/row_actions/RemoveAction';
import {GetTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/GetTenantDTO';
import {ColumnSize} from '@copor/core/client/Core/Table/enum/ColumnSize';
import {Alignment} from '@copor/core/client/Core/Table/enum/Alignment';

export class GetTenantTablePresenter extends PaginatedTablePresenter<GetTenantDTO> {
	protected getHeader() : ColumnHeaderDTO[] {
		i18next.setDefaultNamespace('tenant');
		return [
			{name: i18next.t('translationStringList.TENANT_NAME'), size: ColumnSize.col16, sortKey: 'SORT_BY_NAME', defaultSortDir: 'asc'},
			{name: i18next.t('translationStringList.IS_BASE_TENANT'),
				sortKey: 'SORT_BY_TENANT_TYPE', defaultSortDir: 'asc', fixedWidth: 110},
			{name: i18next.t('translationStringList.ACTIONS'), fixedWidth: 110, alignment: Alignment.right}
		];
	}

	protected getRowCells(tenant: GetTenantDTO) : TableCell[] {
		return [
			new TextCell(tenant.name),
			new IsCheckedCell(tenant.isBaseTenant),
			new ActionCell(this.getActions(), tenant.id)
		];
	}

	protected getActions(): RowAction[] {
		i18next.setDefaultNamespace('tenant');
		return [
			new EditAction('tenant'),
			new RemoveAction('tenant')
		];
	}
}
