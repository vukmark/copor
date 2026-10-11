import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {UserNotInChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/UserNotInChatException';
import {IsUserNotInChatRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/IsUserNotInChatRepo';

export interface ValidateIsChatMemberDTO {
	userId: string;
	chatId: string;
}

export class ValidateIsChatMember extends ValidatorWithRepo<IsUserNotInChatRepo, ValidateIsChatMemberDTO> {
	public async validate(): Promise<void> {
		if (await this.repository.isUserNotInChat(this.input?.userId, this.input?.chatId))
			throw new UserNotInChatException();
	}
}
