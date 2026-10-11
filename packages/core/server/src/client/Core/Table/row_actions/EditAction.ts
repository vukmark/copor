import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {ActionType} from '@copor/core/client/Core/Table/enum/ActionType';
import i18n from '@copor/core/client/i18n';

export class EditAction implements RowAction {
	private readonly listType: string;
	constructor(listType: string) {
		this.listType = listType;
	}
	getRoutePath(id: string): string {
		return `/administration/${this.listType}/edit/${id}`;
	}

	getActionType(): ActionType {
		return ActionType.edit;
	}

	getPopupMessage(): string {
		i18n.setDefaultNamespace('table');
		return i18n.t('translationStringList.EDIT');
	}
}