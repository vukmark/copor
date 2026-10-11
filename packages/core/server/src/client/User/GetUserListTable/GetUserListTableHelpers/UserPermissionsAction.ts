import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {ActionType} from '@copor/core/client/Core/Table/enum/ActionType';
import i18next from 'i18next';

export class UserPermissionsAction implements RowAction {
	getRoutePath(id: string): string {
		return id;
	}

	getActionType(): ActionType {
		return ActionType.permissions;
	}

	getPopupMessage(): string {
		i18next.setDefaultNamespace('table');
		return i18next.t('translationStringList.PERMISSIONS');
	}
}