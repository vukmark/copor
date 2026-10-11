import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {UserNotInChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/UserNotInChatException';
import {ValidateIsUserInChatDTO} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/validations/dto/ValidateIsUserInChatDTO';
import {IsUserNotInChatRepo} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/repository/IsUserNotInChatRepo';

export class ValidateIsUserInChat extends ValidatorWithRepo<IsUserNotInChatRepo, ValidateIsUserInChatDTO> {
	public async validate(): Promise<void> {
		if (await this.repository.isUserNotInChat(this.input?.userId, this.input?.chatId))
			throw new UserNotInChatException();
	}
}
