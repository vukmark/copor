import {ValidateDeletePrivateToDoRepo} from '@copor/todo/domain/ToDo/PrivateToDo/repository/ValidateDeletePrivateToDoRepo';

export class FakeDeletePrivateToDoValidatorStorageRepo implements ValidateDeletePrivateToDoRepo {
	isInvalidToDo(toDoId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}