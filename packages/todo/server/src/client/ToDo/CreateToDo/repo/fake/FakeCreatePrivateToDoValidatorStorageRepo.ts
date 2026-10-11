import {ValidateCreatePrivateToDoRepo} from '@copor/todo/domain/ToDo/PrivateToDo/repository/ValidateCreatePrivateToDoRepo';


export class FakeCreatePrivateToDoValidatorStorageRepo implements ValidateCreatePrivateToDoRepo {
	isInvalidTag(tagId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}
