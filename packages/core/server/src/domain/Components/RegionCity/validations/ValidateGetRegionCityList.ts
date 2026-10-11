import {
	ValidateCanGetRegionCityList
} from '@copor/core/domain/Components/RegionCity/validations/permissions/ValidateCanGetRegionCityList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';

export class ValidateGetRegionCityList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetRegionCityList(this.permissionRepo, this.input)
		];
	}
}