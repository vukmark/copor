import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {ActionType} from '@copor/core/client/Core/Table/enum/ActionType';
import i18next from 'i18next';

export class ToggleActiveAction implements RowAction {
	private readonly isActive: boolean;

	constructor(isActive: boolean) {
		this.isActive = isActive;
	}

	getRoutePath(id: string): string {
		return `/user/${id}/active`;
	}

	getActionType(): ActionType {
		return ActionType.toggleActive;
	}

	getIsActive(): boolean {
		return this.isActive;
	}

	getPopupMessage(): string {
		i18next.setDefaultNamespace('table');
		return this.isActive
			? i18next.t('translationStringList.DEACTIVATE')
			: i18next.t('translationStringList.ACTIVATE');
	}
}