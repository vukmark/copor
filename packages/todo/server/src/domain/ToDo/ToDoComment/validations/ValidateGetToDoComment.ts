import {ValidateCanGetToDoComment} from './permissions/ValidateCanGetToDoComment';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {ValidateEmptyId} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyId';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateGetToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/validations/dto/ValidateGetToDoCommentDTO';

export class ValidateGetToDoComment extends ValidationWithPermission<ValidateGetToDoCommentDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetToDoComment(this.permissionRepo, this.input.actorId),
			new ValidateEmptyId(this.input.id)
		];
	}
}