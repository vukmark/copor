import {ActionType} from '@copor/core/client/Core/Table/enum/ActionType';

export interface RowAction {
	getRoutePath(id: string): string;

	getActionType(): ActionType;

	getPopupMessage(): string;

	getIsActive?(): boolean;
}