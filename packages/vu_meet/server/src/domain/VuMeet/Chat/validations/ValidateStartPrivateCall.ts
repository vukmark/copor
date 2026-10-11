import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateChatExists} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateChatExists';
import {ValidateIsChatMember} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateIsChatMember';
import {
	ValidateCanStartPrivateCall
} from '@copor/vu_meet/domain/VuMeet/Chat/validations/validator/ValidateCanStartPrivateCall';
import {ValidateStartPrivateCallDTO} from '@copor/vu_meet/domain/VuMeet/Chat/validations/dto/ValidateStartPrivateCallDTO';
import {ValidateStartPrivateCallRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateStartPrivateCallRepo';

export class ValidateStartPrivateCall extends ValidationWithPermissionAndRepo<ValidateStartPrivateCallDTO, ValidateStartPrivateCallRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanStartPrivateCall(this.permissionRepo, this.input.actorId),
			new ValidateChatExists(this.storageRepo, this.input.chatId),
			new ValidateIsChatMember(this.storageRepo, {userId: this.input.actorId, chatId: this.input.chatId})
		];
	}
}