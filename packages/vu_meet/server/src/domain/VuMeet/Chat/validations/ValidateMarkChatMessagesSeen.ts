import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateChatExists} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateChatExists';
import {ValidateIsChatMember} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateIsChatMember';
import {
	ValidateCanMarkChatMessagesSeen
} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateCanMarkChatMessagesSeen';
import {ValidateMarkChatMessagesSeenDTO} from './dto/ValidateMarkChatMessagesSeenDTO';
import {ValidateMarkChatMessagesSeenRepo} from './dto/ValidateMarkChatMessagesSeenRepo';

export class ValidateMarkChatMessagesSeen extends ValidationWithPermissionAndRepo<ValidateMarkChatMessagesSeenDTO, ValidateMarkChatMessagesSeenRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanMarkChatMessagesSeen(this.permissionRepo, this.input.userId),
			new ValidateChatExists(this.storageRepo, this.input.chatId),
			new ValidateIsChatMember(this.storageRepo, {userId: this.input.userId, chatId: this.input.chatId}),
		];
	}
}
