import i18next from 'i18next';
import {PaginatedTablePresenter} from '@copor/core/client/Core/Table/presenter/TablePresenter';
import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import {GetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/GetAiContextItemDTO';
import {ActionCell, DescriptionCell, TableCell} from '@copor/core/client/Core/Table/TableCell';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {EditAction} from '@copor/core/client/Core/Table/row_actions/EditAction';
import {RemoveAction} from '@copor/core/client/Core/Table/row_actions/RemoveAction';
import {Alignment} from '@copor/core/client/Core/Table/enum/Alignment';

export class GetAiContextItemTablePresenter
	extends PaginatedTablePresenter<GetAiContextItemDTO> {
	protected getHeader(): ColumnHeaderDTO[] {
		i18next.setDefaultNamespace('form');
		return [
			{name: i18next.t('translationStringList.QUESTION_DE'), sortKey: 'SORT_BY_NAME', defaultSortDir: 'asc'},
			{name: i18next.t('translationStringList.ANSWER_DE')},
			{name: i18next.t('translationStringList.QUESTION_EN')},
			{name: i18next.t('translationStringList.ANSWER_EN')},
			{name: i18next.t('translationStringList.ACTIONS'), fixedWidth: 110, alignment: Alignment.right}
		];
	}

	protected getRowCells(aiContextItem: GetAiContextItemDTO): TableCell[] {
		i18next.setDefaultNamespace('form');
		return [
			new DescriptionCell(aiContextItem.questionDe),
			new DescriptionCell(aiContextItem.answerDe),
			new DescriptionCell(aiContextItem.questionEn),
			new DescriptionCell(aiContextItem.answerEn),
			new ActionCell(this.getActions(), aiContextItem.id)
		];
	}

	protected getActions(): RowAction[] {
		i18next.setDefaultNamespace('form');
		return [
			new EditAction('ai-context-item'),
			new RemoveAction('ai-context-item')
		];
	}
}