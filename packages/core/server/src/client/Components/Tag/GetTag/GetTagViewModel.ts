import {Color} from '@copor/core/domain/Core/enum/Color';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';

export interface GetTagViewModel {
	id: string;
	name: string;
	color: Color;
	colorSet: ColorSet;
	description?: string;
	isPrivate: boolean;
}
