import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsInvalidCloudFileRepo} from '@copor/cloud/domain/Cloud/repository/IsInvalidCloudFileRepo';
import {InvalidCloudFileException} from '@copor/cloud/domain/Cloud/exception/InvalidCloudFileException';

export class ValidateCloudFile extends ValidatorWithRepo<IsInvalidCloudFileRepo, string> {
    public async validate(): Promise<void> {
        if (await this.repository.isInvalidCloudFile(this.input))
            throw new InvalidCloudFileException();
    }
}