import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {InvalidToDoAttachmentException} from '@copor/todo/domain/ToDo/ToDoItem/exception/InvalidToDoAttachmentException';
import {InvalidIDException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidIDException';
import {IsInvalidToDoAttachmentRepo} from '../repository/IsInvalidToDoAttachmentRepo';

export class ValidateToDoAttachmentExists extends ValidatorWithRepo<IsInvalidToDoAttachmentRepo, string> {
	public async validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.input) {
				reject(new InvalidIDException());
			}
			this.repository.isInvalidToDoAttachment(this.input).then((isInvalidToDoAttachment) => {
				if (isInvalidToDoAttachment) {
					throw new InvalidToDoAttachmentException();
				}
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}
