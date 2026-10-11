import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {ActionType} from '@copor/core/client/Core/Table/enum/ActionType';
import i18n from '@copor/core/client/i18n';

export class RemoveAction implements RowAction {
	private readonly listType: string;
	constructor(listType: string) {
		this.listType = listType;
	}
	getRoutePath(id: string): string {
		return `/${this.listType}/${id}`;
	}

	getActionType(): ActionType {
		return ActionType.remove;
	}

	getPopupMessage(): string {
		i18n.setDefaultNamespace('table');
		return i18n.t('translationStringList.DELETE');
	}
}