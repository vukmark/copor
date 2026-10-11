import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateIsUserInChat} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateIsUserInChat';
import {ValidateChat} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateChat';
import {ValidateCanSendTypingStatus} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateCanSendTypingStatus';
import {ValidateSendTypingStatusDTO} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/validations/dto/ValidateSendTypingStatusDTO';
import {ValidateSendTypingStatusRepo} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/repository/ValidateSendTypingStatusRepo';

export class ValidateSendTypingStatus extends ValidationWithPermissionAndRepo<ValidateSendTypingStatusDTO, ValidateSendTypingStatusRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanSendTypingStatus(this.permissionRepo, this.input.actorId),
			new ValidateChat(this.storageRepo, this.input.chatId),
			new ValidateIsUserInChat(this.storageRepo, {userId: this.input.actorId, chatId: this.input.chatId})
		];
	}
}
