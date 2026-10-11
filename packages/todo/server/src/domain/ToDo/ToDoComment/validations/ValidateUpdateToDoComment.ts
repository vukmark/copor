import {ValidateCanUpdateToDoComment} from './permissions/ValidateCanUpdateToDoComment';
import {ValidateUpdateToDoCommentRepo} from './repository/ValidateUpdateToDoComment';
import {ValidateUpdateToDoCommentDTO} from './dto/ValidateUpdateToDoCommentDTO';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateTodoItem} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateTodoItem';
import {ValidateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/validations/ValidateToDoComment';

export class ValidateUpdateToDoComment
	extends ValidationWithPermissionAndRepo<ValidateUpdateToDoCommentDTO, ValidateUpdateToDoCommentRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateToDoComment(this.permissionRepo, this.input.actorId),
			new ValidateTodoItem(this.storageRepo, this.input.toDoId),
			new ValidateToDoComment(this.storageRepo, this.input.id)
		];
	}
}
