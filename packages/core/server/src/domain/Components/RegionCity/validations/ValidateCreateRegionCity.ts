import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateCreateRegionCityDTO} from '@copor/core/domain/Components/RegionCity/validations/dto/ValidateCreateRegionCityDTO';
import {ValidateCreateRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateCreateRegionCityRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	ValidateCanCreateRegionCity
} from '@copor/core/domain/Components/RegionCity/validations/permissions/ValidateCanCreateRegionCity';
import {ValidateCity} from '@copor/core/domain/Core/Validations/Validators/ValidateCity';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateEmptyCode} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyCode';
import {ValidateLatitude} from '@copor/core/domain/Core/Validations/Validators/ValidateLatitude';
import {ValidateLongitude} from '@copor/core/domain/Core/Validations/Validators/ValidateLongitude';
import {ValidateRegion} from '@copor/core/domain/Core/Validations/Validators/ValidateRegion';

export class ValidateCreateRegionCity
	extends ValidationWithPermissionAndRepo<ValidateCreateRegionCityDTO, ValidateCreateRegionCityRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateRegionCity(this.permissionRepo, this.input.actorId),
			new ValidateCity(this.input.city),
			new ValidateRegion(this.storageRepo, this.input.regionId),
			new ValidateEmptyName(this.input.province),
			new ValidateEmptyCode(this.input.provinceCode),
			new ValidateEmptyName(this.input.community),
			new ValidateEmptyCode(this.input.communityCode),
			new ValidateLatitude(this.input.latitude),
			new ValidateLongitude(this.input.longitude)
		];
	}
}