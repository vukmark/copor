import {ActionType} from '@copor/core/client/Core/Table/enum/ActionType';

export interface CoporActionDTO {
	routerPath: string;
	actionType: ActionType;
	popupMessage: string;
	isActive?: boolean;
}