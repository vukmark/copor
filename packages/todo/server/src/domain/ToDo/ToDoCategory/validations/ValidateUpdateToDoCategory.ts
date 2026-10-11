import {ValidateCanUpdateToDoCategory} from './permissions/ValidateCanUpdateToDoCategory';
import {ValidateUpdateToDoCategoryRepo} from '../repository/ValidateUpdateToDoCategoryRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateEmptyTitle} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyTitle';
import {ValidateToDoCategory} from '@copor/todo/domain/ToDo/ToDoCategory/validations/ValidateToDoCategory';
import {SaveToDoCategoryDTO} from '../interactor/dto/SaveToDoCategoryDTO';

export class ValidateUpdateToDoCategory extends ValidationWithPermissionAndRepo<SaveToDoCategoryDTO, ValidateUpdateToDoCategoryRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateToDoCategory(this.permissionRepo, this.input.actorId),
			new ValidateEmptyTitle(this.input.name),
			new ValidateToDoCategory(this.storageRepo, this.input.id)
		];
	}
}
