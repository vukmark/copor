import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	ValidateCanUpdateRegionCity
} from '@copor/core/domain/Components/RegionCity/validations/permissions/ValidateCanUpdateRegionCity';
import {ValidateCreateRegionCityDTO} from '@copor/core/domain/Components/RegionCity/validations/dto/ValidateCreateRegionCityDTO';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateEmptyCode} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyCode';
import {ValidateCity} from '@copor/core/domain/Core/Validations/Validators/ValidateCity';
import {ValidateUpdateRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateUpdateRegionCityRepo';
import {ValidateLatitude} from '@copor/core/domain/Core/Validations/Validators/ValidateLatitude';
import {ValidateLongitude} from '@copor/core/domain/Core/Validations/Validators/ValidateLongitude';

export class ValidateUpdateRegionCity extends ValidationWithPermissionAndRepo<ValidateCreateRegionCityDTO, ValidateUpdateRegionCityRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateRegionCity(this.permissionRepo, this.input.actorId),
			new ValidateCity(this.input.city),
			new ValidateEmptyName(this.input.province),
			new ValidateEmptyCode(this.input.provinceCode),
			new ValidateEmptyName(this.input.community),
			new ValidateEmptyCode(this.input.communityCode),
			new ValidateLatitude(this.input.latitude),
			new ValidateLongitude(this.input.longitude)
		];
	}
}
