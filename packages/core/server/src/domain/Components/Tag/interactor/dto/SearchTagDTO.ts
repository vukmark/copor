import {Color} from '../../../../Core/enum/Color';

export interface SearchTagDTO {
	id: string;
	name: string;
	color: Color;
	description?: string;
}
