import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateDeleteRegionCityDTO} from '@copor/core/domain/Components/RegionCity/validations/dto/ValidateDeleteRegionCityDTO';
import {ValidateGetRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateGetRegionCityRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetRegionCity} from '@copor/core/domain/Components/RegionCity/validations/permissions/ValidateCanGetRegionCity';
import {ValidateRegionCity} from '@copor/core/domain/Core/Validations/Validators/ValidateRegionCity';

export class ValidateGetRegionCity
	extends ValidationWithPermissionAndRepo<ValidateDeleteRegionCityDTO, ValidateGetRegionCityRepo> {
	public getValidators(): Validator[] {
		const validators: Validator[] = [
			new ValidateCanGetRegionCity(this.permissionRepo, this.input.actorId)
		];

		if (this.input.regionCityId) {
			validators.push(
				new ValidateRegionCity(this.storageRepo, this.input.regionCityId)
			);
		}

		return validators;
	}
}