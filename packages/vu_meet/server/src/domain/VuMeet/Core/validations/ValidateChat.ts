import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {InvalidChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/InvalidChatException';

import {IsInvalidChatRepo} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/repository/IsInvalidChatRepo';

export class ValidateChat extends ValidatorWithRepo<IsInvalidChatRepo, string> {
	public async validate(): Promise<void> {
		if (await this.repository.isInvalidChat(this.input))
			throw new InvalidChatException();
	}
}
