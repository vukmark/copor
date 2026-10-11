import {ValidateResendRegistrationCode} from '@copor/core/domain/Registration/validations/ValidateResendRegistrationCode';
import {RegistrationStatusRepo} from '@copor/core/domain/Registration/repository/RegistrationStatusRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {RegistrationDisabledException} from '@copor/core/domain/Registration/exception/RegistrationDisabledException';

describe('ValidateResendRegistrationCode', () => {
	const repo: jest.Mocked<RegistrationStatusRepo> = {isSelfRegistrationEnabled: jest.fn()};

	it('passes while registration is on', async () => {
		repo.isSelfRegistrationEnabled.mockResolvedValue(true);

		expect(await new ValidateResendRegistrationCode(repo).validate()).toBeUndefined();
	});

	it('fails while registration is off', async () => {
		repo.isSelfRegistrationEnabled.mockResolvedValue(false);

		expect(await new ValidateResendRegistrationCode(repo).validate())
			.toStrictEqual(new ErrorList([new RegistrationDisabledException()]));
	});
});
