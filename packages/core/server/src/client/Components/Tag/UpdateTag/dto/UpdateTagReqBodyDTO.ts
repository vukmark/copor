import {Color} from '@copor/core/domain/Core/enum/Color';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';

export interface UpdateTagReqBodyDTO {
	id: string;
	name: string;
	color: Color;
	colorSet: ColorSet;
	description?: string;
	isPrivate?: boolean;
	actorId: string;
}
