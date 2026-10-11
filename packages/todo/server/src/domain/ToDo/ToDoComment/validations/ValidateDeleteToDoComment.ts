import {ValidateCanDeleteToDoComment} from './permissions/ValidateCanDeleteToDoComment';
import {ValidateDeleteToDoCommentRepo} from '../repository/ValidateDeleteToDoCommentRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyId} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyId';
import {ValidateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/validations/ValidateToDoComment';
import {ValidateDeleteToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/validations/dto/ValidateDeleteToDoCommentDTO';

export class ValidateDeleteToDoComment
	extends ValidationWithPermissionAndRepo<ValidateDeleteToDoCommentDTO, ValidateDeleteToDoCommentRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteToDoComment(this.permissionRepo, this.input.actorId),
			new ValidateEmptyId(this.input.id),
			new ValidateToDoComment(this.storageRepo, this.input.id)
		];
	}
}
