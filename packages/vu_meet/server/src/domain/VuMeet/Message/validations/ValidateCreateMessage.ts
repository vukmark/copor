import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';
import {ValidateChatExists} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateChatExists';
import {ValidateCanCreateMessage} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateCanCreateMessage';
import {ValidateCreateMessageDTO} from './dto/ValidateCreateMessageDTO';
import {ValidateCreateMessageRepo} from '../repository/ValidateCreateMessageRepo';
import {ValidateIsChatMember} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateIsChatMember';
import {ValidateFileSize} from '@copor/core/domain/Core/Validations/Validators/ValidateFileSize';
import {ValidateEmptyContent} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyContent';
import {ValidateMaxLength} from '@copor/core/domain/Core/Validations/Validators/ValidateMaxLength';

const MAX_MESSAGE_CONTENT_LENGTH = 5000;

export class ValidateCreateMessage extends
	ValidationWithPermissionAndRepo<ValidateCreateMessageDTO, ValidateCreateMessageRepo> {
	public getValidators(): Validator[] {
		const validators: Validator[] = [
			new ValidateCanCreateMessage(this.permissionRepo, this.input.actorId),
			new ValidateUser(this.storageRepo, this.input.sender),
			new ValidateChatExists(this.storageRepo, this.input.chat),
			new ValidateIsChatMember(this.storageRepo, {
				userId: this.input.sender,
				chatId: this.input.chat
			}),
			new ValidateEmptyContent(this.input.content),
			new ValidateMaxLength(this.input.content, MAX_MESSAGE_CONTENT_LENGTH)
		];

		if (this.input.file)
			validators.push(new ValidateFileSize(this.storageRepo, this.input.file));
		return validators;
	}
}
