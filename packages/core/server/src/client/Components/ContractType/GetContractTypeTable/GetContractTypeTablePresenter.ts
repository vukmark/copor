import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import {ActionCell, PublishStatusCell, TableCell, TextCell} from '@copor/core/client/Core/Table/TableCell';
import {PaginatedTablePresenter} from '@copor/core/client/Core/Table/presenter/TablePresenter';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {EditAction} from '@copor/core/client/Core/Table/row_actions/EditAction';
import {RemoveAction} from '@copor/core/client/Core/Table/row_actions/RemoveAction';
import i18next from 'i18next';
import {GetContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/GetContractTypeDTO';
import {Alignment} from '@copor/core/client/Core/Table/enum/Alignment';


export class GetContractTypeTablePresenter extends PaginatedTablePresenter<GetContractTypeDTO> {
	protected getHeader() : ColumnHeaderDTO[] {
		i18next.setDefaultNamespace('contract_type');
		return [
			{name: i18next.t('translationStringList.CONTRACT_TYPE'), sortKey: 'SORT_BY_NAME', defaultSortDir: 'asc'},
			{name: i18next.t('translationStringList.DESCRIPTION')},
			{name: i18next.t('translationStringList.PUBLISH_STATUS'), fixedWidth: 110},
			{name: i18next.t('translationStringList.ACTIONS'), fixedWidth: 110, alignment: Alignment.right}
		];
	}

	protected getRowCells(contractType: GetContractTypeDTO) : TableCell[] {
		return [
			new TextCell(contractType.name),
			new TextCell(contractType.description ?? ''),
			new PublishStatusCell(contractType.publishStatus),
			new ActionCell(this.getActions(), contractType.id)
		];
	}

	protected getActions(): RowAction[] {
		i18next.setDefaultNamespace('contract_type');
		return [
			new EditAction('contract-type'),
			new RemoveAction('contract-type')
		];
	}
}
