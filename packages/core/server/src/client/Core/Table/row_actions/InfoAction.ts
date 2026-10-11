import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {ActionType} from '@copor/core/client/Core/Table/enum/ActionType';

export class InfoAction implements RowAction {
	private readonly listType: string;
	private readonly popupMessage: string;
	constructor(listType: string, popupMessage: string) {
		this.listType = listType;
		this.popupMessage = popupMessage;
	}
	getRoutePath(id: string): string {
		return `/administration/${this.listType}/info/${id}`;
	}

	getActionType(): ActionType {
		return ActionType.info;
	}

	getPopupMessage(): string {
		return this.popupMessage;
	}
}