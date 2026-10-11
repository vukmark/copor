import {RegistrationStatusRepo} from '@copor/core/domain/Registration/repository/RegistrationStatusRepo';
import {ValidateRegisterRepo} from '@copor/core/domain/Registration/repository/ValidateRegisterRepo';
import {RegisterRepo} from '@copor/core/domain/Registration/repository/RegisterRepo';
import {ValidateVerifyRegistrationRepo} from '@copor/core/domain/Registration/repository/ValidateVerifyRegistrationRepo';
import {VerifyRegistrationRepo} from '@copor/core/domain/Registration/repository/VerifyRegistrationRepo';
import {ResendRegistrationCodeRepo} from '@copor/core/domain/Registration/repository/ResendRegistrationCodeRepo';
import {GetPasswordSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetPasswordSystemSettingsDTO';
import {DEFAULT_PASSWORD_POLICY} from '@copor/core/client/SystemSettings/settings/DefaultPasswordPolicy';

// DB_ENV=FAKE: registration is on, nothing is taken, and "123456" is the valid code.
export class FakeRegistrationStatusRepo implements RegistrationStatusRepo {
	public isSelfRegistrationEnabled(): Promise<boolean> {
		return Promise.resolve(true);
	}
}

export class FakeValidateRegisterRepo extends FakeRegistrationStatusRepo implements ValidateRegisterRepo {
	public isEmailAlreadyInUse(): Promise<boolean> {
		return Promise.resolve(false);
	}

	public isUsernameTaken(): Promise<boolean> {
		return Promise.resolve(false);
	}

	public getPasswordPolicy(): Promise<GetPasswordSystemSettingsDTO> {
		return Promise.resolve(DEFAULT_PASSWORD_POLICY);
	}
}

export class FakeRegisterRepo implements RegisterRepo {
	public save(): Promise<void> {
		return Promise.resolve();
	}
}

export class FakeValidateVerifyRegistrationRepo extends FakeRegistrationStatusRepo
	implements ValidateVerifyRegistrationRepo {
	public isValidVerificationCode(input: {code: string}): Promise<boolean> {
		return Promise.resolve(input.code === '123456');
	}

	public getPendingUserId(): Promise<string | undefined> {
		return Promise.resolve('fake-user-id');
	}
}

export class FakeVerifyRegistrationRepo implements VerifyRegistrationRepo {
	public activate(): Promise<void> {
		return Promise.resolve();
	}
}

export class FakeResendRegistrationCodeRepo implements ResendRegistrationCodeRepo {
	public resend(): Promise<void> {
		return Promise.resolve();
	}
}
