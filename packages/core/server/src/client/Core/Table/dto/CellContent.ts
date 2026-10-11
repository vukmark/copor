import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CoporActionDTO} from '@copor/core/client/Core/Table/dto/CoporActionDTO';
import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Progress} from '@copor/core/domain/Core/enum/Progress';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {ContentType} from '@copor/core/domain/Core/enum/ContentType';
import {GroupListDTO} from '@copor/core/domain/User/interactor/dto/GroupListDTO';

export interface CellContent {
	text?: string;
	color?: number;
	publishStatus?: PublishStatus;
	actionList?: CoporActionDTO[];
	copyText?: string;
	isFeatured?: boolean;
	isChecked?: boolean;
	date?: string;
	priority?: Priority;
	progress?: Progress;
	picture?: string;
	hiddenText?: {key: string, value: string};
	role?: RoleType[];
	contentType?: ContentType;
	groupList?: GroupListDTO;
}