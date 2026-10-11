import {ValidateCanCreateToDoComment} from './permissions/ValidateCanCreateToDoComment';
import {ValidateCreateToDoCommentRepo} from '../repository/ValidateCreateToDoCommentRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyContent} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyContent';
import {ValidateTodoItem} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateTodoItem';
import {ValidateCreateToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/validations/dto/ValidateCreateToDoCommentDTO';

export class ValidateCreateToDoComment extends
	ValidationWithPermissionAndRepo<ValidateCreateToDoCommentDTO, ValidateCreateToDoCommentRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateToDoComment(this.permissionRepo, this.input.actorId),
			new ValidateEmptyContent(this.input.content),
			new ValidateTodoItem(this.storageRepo, this.input.toDoId)
		];
	}
}
