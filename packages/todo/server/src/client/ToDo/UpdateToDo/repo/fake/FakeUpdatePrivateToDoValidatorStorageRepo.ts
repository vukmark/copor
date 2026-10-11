import {ValidateUpdatePrivateToDoRepo} from '@copor/todo/domain/ToDo/PrivateToDo/repository/ValidateUpdatePrivateToDoRepo';


export class FakeUpdatePrivateToDoValidatorStorageRepo implements ValidateUpdatePrivateToDoRepo {
	isInvalidToDo(taskId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
	public isInvalidTag(tagId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
