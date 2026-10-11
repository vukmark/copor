import {Color} from '@copor/core/domain/Core/enum/Color';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';

export interface CreateTagReqBodyDTO {
	name: string;
	description?: string;
	color: Color;
	colorSet: ColorSet;
	isPrivate?: boolean;
}
