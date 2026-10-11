import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Color} from '@copor/core/domain/Core/enum/Color';
import {PriorityDTO} from '@copor/core/client/Core/Helpers/PriorityDTO';

export class PriorityHelper {
	public static getPriorityDTO (id: Priority): PriorityDTO {
		switch (id) {
			case Priority.HIGH :
				return {
					id: id,
					color: Color.red
				};
				break;
			case Priority.NORMAL :
				return {
					id: id,
					color: Color.deepOrange
				};
				break;
			case Priority.URGENT :
				return {
					id: id,
					color: Color.red
				};
				break;
			default :
				return {
					id: id,
					color: Color.white
				};
				break;
		}
	}
}