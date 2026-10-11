import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {InvalidIDException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidIDException';
import {IsInvalidToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/IsInvalidToDoRepo';
import {InvalidToDoException} from '@copor/todo/domain/ToDo/ToDoItem/exception/InvalidToDoException';

export class ValidateTodoItem extends ValidatorWithRepo<IsInvalidToDoRepo, string | undefined> {
	public async validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.input) {
				reject(new InvalidIDException());
			}
			this.repository.isInvalidToDo(this.input).then((isInvalidToDo) => {
				if (isInvalidToDo) {
					throw new InvalidToDoException();
				}
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}