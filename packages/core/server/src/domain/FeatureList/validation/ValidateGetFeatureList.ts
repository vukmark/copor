import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateGetFeatureListDTO} from '@copor/core/domain/FeatureList/validation/dto/ValidateGetFeatureListDTO';
import {ValidateCanGetFeatureList} from '@copor/core/domain/FeatureList/validation/validator/ValidateCanGetFeatureList';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';

export class ValidateGetFeatureList extends ValidationWithPermission<ValidateGetFeatureListDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetFeatureList(this.permissionRepo, this.input.actorId)
		];
	}
}
