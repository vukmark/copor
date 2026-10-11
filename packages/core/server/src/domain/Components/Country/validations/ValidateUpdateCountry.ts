import {SaveCountryDTO} from '../interactor/dto/SaveCountryDTO';
import {ValidateCanUpdateCountry} from './permissions/ValidateCanUpdateCountry';
import {ValidateUpdateCountryRepo} from '../repository/ValidateUpdateCountryRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCountry} from '@copor/core/domain/Core/Validations/Validators/ValidateCountry';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateEmptyCode} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyCode';

export class ValidateUpdateCountry extends ValidationWithPermissionAndRepo<SaveCountryDTO, ValidateUpdateCountryRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateCountry(this.permissionRepo, this.input.actorId),
			new ValidateCountry(this.storageRepo, this.input.id),
			new ValidateEmptyName(this.input.name),
			new ValidateEmptyCode(this.input.code)
		];
	}
}
