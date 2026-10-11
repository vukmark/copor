import {ValidateCanGetCountry} from './permissions/ValidateCanGetCountry';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCountry} from '@copor/core/domain/Core/Validations/Validators/ValidateCountry';
import {ValidateGetCountryRepo} from '../repository/ValidateGetCountryRepo';
import {ValidateGetCountryDTO} from './dto/ValidateGetCountryDTO';

export class ValidateGetCountry extends ValidationWithPermissionAndRepo<ValidateGetCountryDTO, ValidateGetCountryRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetCountry(this.permissionRepo, this.input.actorId),
			new ValidateCountry(this.storageRepo, this.input.countryId)
		];
	}
}
