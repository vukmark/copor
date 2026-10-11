import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {ActionType} from '@copor/core/client/Core/Table/enum/ActionType';
import i18next from 'i18next';

export class UserEditAction implements RowAction {
	getRoutePath(id: string): string {
		return `/administration/user/edit/${id}`;
	}

	getActionType(): ActionType {
		return ActionType.edit;
	}

	getPopupMessage(): string {
		i18next.setDefaultNamespace('table');
		return i18next.t('translationStringList.EDIT');
	}
}