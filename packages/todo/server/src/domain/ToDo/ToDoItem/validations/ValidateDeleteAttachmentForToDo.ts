import {ValidateDeleteAttachmentForToDoDTO} from './dto/ValidateDeleteAttachmentForToDoDTO';
import {ValidateCanDeleteAttachmentForToDo} from './permissions/ValidateCanDeleteAttachmentForToDo';
import {ValidateToDoAttachmentExists} from './ValidateToDoAttachmentExists';
import {ValidateCanAccessAttachmentForToDo} from './ValidateCanAccessAttachmentForToDo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateDeleteAttachmentForToDoRepo} from '../repository/ValidateDeleteAttachmentForToDoRepo';

export class ValidateDeleteAttachmentForToDo extends ValidationWithPermissionAndRepo<
	ValidateDeleteAttachmentForToDoDTO,
	ValidateDeleteAttachmentForToDoRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteAttachmentForToDo(this.permissionRepo, this.input.actorUserId),
			new ValidateToDoAttachmentExists(this.storageRepo, this.input.attachmentId),
			new ValidateCanAccessAttachmentForToDo(this.storageRepo, {
				attachmentId: this.input.attachmentId,
				actorId: this.input.actorUserId
			})
		];
	}
}
