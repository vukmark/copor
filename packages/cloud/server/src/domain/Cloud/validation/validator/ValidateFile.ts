import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {InvalidFileException} from '@copor/cloud/domain/Cloud/exception/InvalidFileException';
import {IsInvalidFileRepo} from '@copor/cloud/domain/Cloud/repository/IsNotValidFileRepo';

export class ValidateFile extends ValidatorWithRepo<IsInvalidFileRepo, string | undefined> {
	public async validate(): Promise<void> {
		if (await this.repository.isInvalidFile(this.input))
			throw new InvalidFileException();
	}
}