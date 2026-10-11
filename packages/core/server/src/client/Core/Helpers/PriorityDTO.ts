import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Color} from '@copor/core/domain/Core/enum/Color';

export interface PriorityDTO {
	id: Priority;
	color: Color;
}