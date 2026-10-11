import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsInvalidSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/IsInvalidSystemSettingsRepo';
import {InvalidSystemSettingsException} from '@copor/core/domain/SystemSettings/exception/InvalidSystemSettingsException';

export class ValidateSystemSetting extends ValidatorWithRepo<IsInvalidSystemSettingsRepo, string | undefined> {
    public async validate(): Promise<void> {
        if (await this.repository.isInvalidSystemSettings(this.input))
            throw new InvalidSystemSettingsException();
    }
}