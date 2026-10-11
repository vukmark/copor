import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateDeleteRegionCityDTO} from '@copor/core/domain/Components/RegionCity/validations/dto/ValidateDeleteRegionCityDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	ValidateCanDeleteRegionCity
} from '@copor/core/domain/Components/RegionCity/validations/permissions/ValidateCanDeleteRegionCity';
import {ValidateRegionCity} from '@copor/core/domain/Core/Validations/Validators/ValidateRegionCity';
import {ValidateDeleteRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateDeleteRegionCityRepo';
import {ValidateEntityIsNotReferenced} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export class ValidateDeleteRegionCity
	extends ValidationWithPermissionAndRepo<ValidateDeleteRegionCityDTO, ValidateDeleteRegionCityRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteRegionCity(this.permissionRepo, this.input.actorId),
			new ValidateRegionCity(this.storageRepo, this.input.regionCityId),
			new ValidateEntityIsNotReferenced(this.storageRepo, this.input.regionCityId)
		];
	}
}