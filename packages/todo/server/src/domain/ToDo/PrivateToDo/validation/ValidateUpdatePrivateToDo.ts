import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {SavePrivateToDoDTO} from '../interactor/dto/SavePrivateToDoDTO';
import {ValidateUpdatePrivateToDoRepo} from '../repository/ValidateUpdatePrivateToDoRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanUpdatePrivateToDo, ValidateCanUpdatePrivateToDoContext} from './validator/ValidateCanUpdatePrivateToDo';
import {ValidateEmptyTitle} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyTitle';
import {ValidateTodoItem} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateTodoItem';
import {ValidateTag} from '@copor/core/domain/Core/Validations/Validators/ValidateTag';

export class ValidateUpdatePrivateToDo
	extends ValidationWithPermissionAndRepo<
		SavePrivateToDoDTO,
		ValidateUpdatePrivateToDoRepo,
		ValidateCanUpdatePrivateToDoContext
	> {
	public getValidators(): Validator[] {
		const validators: Validator[] = [
			new ValidateCanUpdatePrivateToDo(this.permissionRepo, this.input.actorId, {toDoId: this.input.id}),
			new ValidateEmptyTitle(this.input.title),
			new ValidateTodoItem(this.storageRepo, this.input.id)
		];

		if (this.input.tagList) {
			this.input.tagList.forEach((tag) => {
				validators.push(new ValidateTag(this.storageRepo, tag));
			});
		}
		return validators;
	}
}
