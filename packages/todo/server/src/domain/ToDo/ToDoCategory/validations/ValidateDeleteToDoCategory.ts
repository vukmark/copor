import {ValidateCanDeleteToDoCategory} from './permissions/ValidateCanDeleteToDoCategory';
import {ValidateDeleteToDoCategoryInputDTO} from './dto/ValidateDeleteToDoCategoryInputDTO';
import {ValidateDeleteToDoCategoryRepo} from '../repository/ValidateDeleteToDoCategoryRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyId} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyId';
import {ValidateToDoCategory} from '@copor/todo/domain/ToDo/ToDoCategory/validations/ValidateToDoCategory';

export class ValidateDeleteToDoCategory extends ValidationWithPermissionAndRepo<ValidateDeleteToDoCategoryInputDTO,
	ValidateDeleteToDoCategoryRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteToDoCategory(this.permissionRepo, this.input.toDoCategoryId),
			new ValidateEmptyId(this.input.toDoCategoryId),
			new ValidateToDoCategory(this.storageRepo, this.input.toDoCategoryId)
		];
	}
}
