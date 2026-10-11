import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {InvalidUserListException} from '@copor/todo/domain/ToDo/ToDoItem/exception/InvalidUserListException';
import {IsInvalidUserListRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/IsInvalidUserListRepo';

export class ValidateUserList extends ValidatorWithRepo<IsInvalidUserListRepo, string[]> {
	public validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.repository.isInvalidUserList(this.input).then((isInvalidUserList) => {
				if (isInvalidUserList)
					throw new InvalidUserListException();
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}
