import {ValidateCanDeleteCountry} from './permissions/ValidateCanDeleteCountry';
import {ValidateDeleteCountryDTO} from './dto/ValidateDeleteCountryDTO';
import {ValidateDeleteCountryRepo} from '../repository/ValidateDeleteCountryRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCountry} from '@copor/core/domain/Core/Validations/Validators/ValidateCountry';
import {ValidateEntityIsNotReferenced} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export class ValidateDeleteCountry extends ValidationWithPermissionAndRepo<ValidateDeleteCountryDTO, ValidateDeleteCountryRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteCountry(this.permissionRepo, this.input.actorId),
			new ValidateCountry(this.storageRepo, this.input.countryId),
			new ValidateEntityIsNotReferenced(this.storageRepo, this.input.countryId)
		];
	}
}