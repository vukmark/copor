import {ValidateGetAttachmentForToDoDTO} from './dto/ValidateGetAttachmentForToDoDTO';
import {ValidateCanGetAttachmentForToDo} from './permissions/ValidateCanGetAttachmentForToDo';
import {ValidateToDoAttachmentExists} from './ValidateToDoAttachmentExists';
import {ValidateCanAccessAttachmentForToDo} from './ValidateCanAccessAttachmentForToDo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateGetAttachmentForToDoRepo} from '../repository/ValidateGetAttachmentForToDoRepo';

export class ValidateGetAttachmentForToDo extends ValidationWithPermissionAndRepo<
	ValidateGetAttachmentForToDoDTO,
	ValidateGetAttachmentForToDoRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetAttachmentForToDo(this.permissionRepo, this.input.actorId),
			new ValidateToDoAttachmentExists(this.storageRepo, this.input.id),
			new ValidateCanAccessAttachmentForToDo(this.storageRepo, {
				attachmentId: this.input.id,
				actorId: this.input.actorId
			})
		];
	}
}
