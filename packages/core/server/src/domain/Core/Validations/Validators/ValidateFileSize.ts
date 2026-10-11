import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import Buffer from 'node:buffer';
import {InvalidFileSizeException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidFileSizeException';
import {IsInvalidFileSizeRepo} from '@copor/core/domain/Core/Repository/IsInvalidFileSizeRepo';

export class ValidateFileSize extends ValidatorWithRepo<IsInvalidFileSizeRepo, Buffer> {
    async validate(): Promise<void> {
        if (await this.repository.isInvalidFileSize(this.input))
            throw new InvalidFileSizeException();
    }
}