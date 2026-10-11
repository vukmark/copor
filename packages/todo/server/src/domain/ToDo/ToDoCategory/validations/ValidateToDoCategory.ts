import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {InvalidIDException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidIDException';
import {IsInvalidToDoCategoryRepo} from '@copor/todo/domain/ToDo/ToDoCategory/repository/IsInvalidToDoCategoryRepo';
import {InvalidToDoCategoryException} from '@copor/todo/domain/ToDo/ToDoCategory/exception/InvalidToDoCategoryException';

export class ValidateToDoCategory extends ValidatorWithRepo<IsInvalidToDoCategoryRepo, string> {
	public async validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.input) {
				reject(new InvalidIDException());
			}
			this.repository.isInvalidToDoCategory(this.input).then((isInvalidToDoCategory) => {
				if (isInvalidToDoCategory) {
					throw new InvalidToDoCategoryException();
				}
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}