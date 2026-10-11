import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateGetChatInfoDTO} from '@copor/vu_meet/domain/VuMeet/Chat/validations/dto/ValidateGetChatInfoDTO';
import {ValidateCanGetChatInfo} from '@copor/vu_meet/domain/VuMeet/Chat/validations/validator/ValidateCanGetChatInfo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateGetChatInfoRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateGetChatInfoRepo';
import {ValidateChat} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateChat';
import {ValidateIsChatMember} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateIsChatMember';

export class ValidateGetChatInfo extends ValidationWithPermissionAndRepo<ValidateGetChatInfoDTO, ValidateGetChatInfoRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetChatInfo(this.permissionRepo, this.input.actorId),
			new ValidateChat(this.storageRepo, this.input.chatId),
			new ValidateIsChatMember(this.storageRepo, {userId: this.input.actorId, chatId: this.input.chatId})
		];
	}
}
