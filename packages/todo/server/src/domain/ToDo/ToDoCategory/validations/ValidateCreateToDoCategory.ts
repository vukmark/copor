import {ValidateCanCreateToDoCategory} from './permissions/ValidateCanCreateToDoCategory';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyTitle} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyTitle';
import {SaveToDoCategoryDTO} from '../interactor/dto/SaveToDoCategoryDTO';

export class ValidateCreateToDoCategory extends ValidationWithPermission<SaveToDoCategoryDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateToDoCategory(this.permissionRepo, this.input.actorId),
			new ValidateEmptyTitle(this.input.name)
		];
	}
}
