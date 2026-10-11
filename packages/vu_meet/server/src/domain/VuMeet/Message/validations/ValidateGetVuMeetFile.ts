import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateGetVuMeetFileDTO} from '@copor/vu_meet/domain/VuMeet/Message/validations/dto/ValidateGetVuMeetFileDTO';
import {ValidateCanGetVuMeetFile} from '@copor/vu_meet/domain/VuMeet/Message/validations/validator/ValidateCanGetVuMeetFile';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateGetVuMeetFileRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/ValidateGetVuMeetFileRepo';
import {
	ValidateIsUserInChatOfMessage
} from '@copor/vu_meet/domain/VuMeet/Message/validations/validator/ValidateIsUserInChatOfMessage';

export class ValidateGetVuMeetFile extends ValidationWithPermissionAndRepo<ValidateGetVuMeetFileDTO, ValidateGetVuMeetFileRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetVuMeetFile(this.permissionRepo, this.input.actorId),
			new ValidateIsUserInChatOfMessage(this.storageRepo, {
				userId: this.input.actorId,
				messageId: this.input.messageId
			})
		];
	}
}
