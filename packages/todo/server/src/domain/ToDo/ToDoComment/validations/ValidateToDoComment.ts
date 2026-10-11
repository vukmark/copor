import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {InvalidIDException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidIDException';
import {IsInvalidToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/IsInvalidToDoCommentRepo';
import {InvalidToDoCommentException} from '@copor/todo/domain/ToDo/ToDoComment/exception/InvalidToDoCommentException';

export class ValidateToDoComment extends ValidatorWithRepo<IsInvalidToDoCommentRepo, string> {
	public async validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.input) {
				reject(new InvalidIDException());
			}
			this.repository.isInvalidToDoComment(this.input).then((isInvalidToDoComment) => {
				if (isInvalidToDoComment) {
					throw new InvalidToDoCommentException();
				}
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}