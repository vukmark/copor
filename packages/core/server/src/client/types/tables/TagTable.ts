import {Color} from '@copor/core/domain/Core/enum/Color';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {Generated} from './Generated';

export interface TagTable {
	id: string;
	actorId: string;
	color: Color;
	colorSet: ColorSet;
	description: string | null;
	isPrivate: boolean;
	name: string;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
}
