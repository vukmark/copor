import {ValidateCreateAttachmentForToDoRepo} from '../repository/ValidateCreateAttachmentForToDoRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanCreateAttachmentForToDo} from './permissions/ValidateCanCreateAttachmentForToDo';
import {ValidateTodoItem} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateTodoItem';
import {ValidateCanAccessToDoForAttachment} from './ValidateCanAccessToDoForAttachment';
import {SaveAttachmentForToDoDTO} from '../interactor/dto/SaveAttachmentForToDoDTO';

export class ValidateCreateAttachmentForToDo extends
	ValidationWithPermissionAndRepo<SaveAttachmentForToDoDTO, ValidateCreateAttachmentForToDoRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateAttachmentForToDo(this.permissionRepo, this.input.actorId),
			new ValidateTodoItem(this.storageRepo, this.input.todoId),
			new ValidateCanAccessToDoForAttachment(this.storageRepo, {
				todoId: this.input.todoId,
				actorId: this.input.actorId
			})
		];
	}
}
