import {PaginatedTablePresenter} from '@copor/core/client/Core/Table/presenter/TablePresenter';
import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import i18next from 'i18next';
import {TableCell, TextCell} from '@copor/core/client/Core/Table/TableCell';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {EditAction} from '@copor/core/client/Core/Table/row_actions/EditAction';
import {RemoveAction} from '@copor/core/client/Core/Table/row_actions/RemoveAction';
import {GetLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/GetLanguageDTO';

export class GetLanguageTablePresenter extends PaginatedTablePresenter<GetLanguageDTO> {
	protected getHeader() : ColumnHeaderDTO[] {
		i18next.setDefaultNamespace('language');
		return [
			{name: i18next.t('translationStringList.LANGUAGE')},
			{name: i18next.t('translationStringList.NATIVE_NAME')},
			{name: i18next.t('translationStringList.CODE')}
		];
	}

	protected getRowCells(language: GetLanguageDTO) : TableCell[] {
		return [
			new TextCell(language.name),
			new TextCell(language.nativeName),
			new TextCell(language.code)
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
