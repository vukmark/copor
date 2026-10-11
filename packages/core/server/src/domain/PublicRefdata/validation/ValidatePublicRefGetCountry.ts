import {ValidateGetCountryRepo} from '@copor/core/domain/Components/Country/repository/ValidateGetCountryRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCountry} from '@copor/core/domain/Core/Validations/Validators/ValidateCountry';
import {ValidateGetCountryDTO} from '@copor/core/domain/Components/Country/validations/dto/ValidateGetCountryDTO';
import {ValidationWithRepo} from '@copor/core/domain/Core/Validations/ValidationWithRepo';

export class ValidatePublicRefGetCountry extends ValidationWithRepo<ValidateGetCountryDTO, ValidateGetCountryRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCountry(this.storageRepo, this.input.countryId)
		];
	}
}
