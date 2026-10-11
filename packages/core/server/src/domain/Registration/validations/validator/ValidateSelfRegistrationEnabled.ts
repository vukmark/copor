import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {RegistrationStatusRepo} from '@copor/core/domain/Registration/repository/RegistrationStatusRepo';
import {RegistrationDisabledException} from '@copor/core/domain/Registration/exception/RegistrationDisabledException';

export class ValidateSelfRegistrationEnabled implements Validator {
	private readonly repository: RegistrationStatusRepo;

	constructor(repository: RegistrationStatusRepo) {
		this.repository = repository;
	}

	public async validate(): Promise<void> {
		if (!await this.repository.isSelfRegistrationEnabled())
			throw new RegistrationDisabledException();
	}
}
