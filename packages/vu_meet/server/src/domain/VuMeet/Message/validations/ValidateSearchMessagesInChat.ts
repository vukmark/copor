import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateChatExists} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateChatExists';
import {ValidateIsChatMember} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateIsChatMember';
import {
	ValidateCanSearchMessagesInChat
} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateCanSearchMessagesInChat';
import {ValidateSearchMessagesInChatRepo} from '../repository/ValidateSearchMessagesInChatRepo';
import {ValidateSearchMessagesInChatDTO} from './dto/ValidateSearchMessagesInChatDTO';

export class ValidateSearchMessagesInChat extends ValidationWithPermissionAndRepo<ValidateSearchMessagesInChatDTO, ValidateSearchMessagesInChatRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanSearchMessagesInChat(this.permissionRepo, this.input.actorId),
			new ValidateChatExists(this.storageRepo, this.input.chatId),
			new ValidateIsChatMember(this.storageRepo, {chatId: this.input.chatId, userId: this.input.actorId}),
		];
	}
}
