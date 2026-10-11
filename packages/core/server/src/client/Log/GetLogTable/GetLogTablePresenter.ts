import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import {ActionCell, TableCell, TextCell} from '@copor/core/client/Core/Table/TableCell';
import {PaginatedTablePresenter} from '@copor/core/client/Core/Table/presenter/TablePresenter';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import i18next from 'i18next';
import {GetLogDTO} from '@copor/core/domain/Log/interactor/dto/GetLogDTO';
import {InfoAction} from '@copor/core/client/Core/Table/row_actions/InfoAction';
import {DateTimeFormat} from '@copor/core/domain/Core/Date/DateTimeFormat';
import {ColumnSize} from '@copor/core/client/Core/Table/enum/ColumnSize';
import {Alignment} from '@copor/core/client/Core/Table/enum/Alignment';

export class GetLogTablePresenter extends PaginatedTablePresenter<GetLogDTO> {
	protected getHeader() : ColumnHeaderDTO[] {
		i18next.setDefaultNamespace('log');
		return [
			{name: i18next.t('translationStringList.ACTOR'), size: ColumnSize.col10},
			{name: i18next.t('translationStringList.ACTION_TYPE'), size: ColumnSize.col7},
			{name: i18next.t('translationStringList.TIMESTAMP'), size: ColumnSize.col7},
			{name: i18next.t('translationStringList.ACTIONS'), fixedWidth: 110, alignment: Alignment.right}
		];
	}

	protected getRowCells(log: GetLogDTO) : TableCell[] {
		i18next.setDefaultNamespace('log_type');

		const createdAt = new DateTimeFormat(
			log.createdAt,
			i18next.language
		).format();

		return [
			new TextCell(log.actorId ?? ''),
			new TextCell(i18next.t('translationStringList.' + log.logType)),
			new TextCell(createdAt),
			new ActionCell(this.getActions(), log.id)
		];
	}

	protected getActions(): RowAction[] {
		i18next.setDefaultNamespace('log');
		return [
			new InfoAction('log', i18next.t('translationStringList.LOG_INFO'))
		];
	}
}
