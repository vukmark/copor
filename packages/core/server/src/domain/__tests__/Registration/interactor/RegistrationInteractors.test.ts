import {Register} from '@copor/core/domain/Registration/interactor/Register';
import {VerifyRegistration} from '@copor/core/domain/Registration/interactor/VerifyRegistration';
import {ResendRegistrationCode} from '@copor/core/domain/Registration/interactor/ResendRegistrationCode';
import {GetRegistrationStatus} from '@copor/core/domain/Registration/interactor/GetRegistrationStatus';
import {RegisterRepo} from '@copor/core/domain/Registration/repository/RegisterRepo';
import {VerifyRegistrationRepo} from '@copor/core/domain/Registration/repository/VerifyRegistrationRepo';
import {ResendRegistrationCodeRepo} from '@copor/core/domain/Registration/repository/ResendRegistrationCodeRepo';
import {RegistrationStatusRepo} from '@copor/core/domain/Registration/repository/RegistrationStatusRepo';
import {SaveRegistrationDTO} from '@copor/core/domain/Registration/interactor/dto/SaveRegistrationDTO';

describe('registration interactors', () => {
	const expiresAt = new Date('2026-10-04T10:30:00.000Z');

	it('Register saves the registration', async () => {
		const repo: jest.Mocked<RegisterRepo> = {save: jest.fn().mockResolvedValue(undefined)};
		const input: SaveRegistrationDTO = {
			userId: 'user-1',
			firstName: 'Jane',
			lastName: 'Doe',
			email: 'jane.doe@example.com',
			userName: 'jane.doe',
			password: 'Str0ng!Secret',
			verificationCode: '123456',
			codeExpiresAt: expiresAt
		};

		await new Register(input, repo).execute();

		expect(repo.save).toHaveBeenCalledWith(input);
	});

	it('VerifyRegistration activates the account with that email', async () => {
		const repo: jest.Mocked<VerifyRegistrationRepo> = {activate: jest.fn().mockResolvedValue(undefined)};

		await new VerifyRegistration('jane.doe@example.com', repo).execute();

		expect(repo.activate).toHaveBeenCalledWith('jane.doe@example.com');
	});

	it('ResendRegistrationCode hands the new code to the repository', async () => {
		const repo: jest.Mocked<ResendRegistrationCodeRepo> = {resend: jest.fn().mockResolvedValue(undefined)};
		const input = {email: 'jane.doe@example.com', verificationCode: '654321', codeExpiresAt: expiresAt};

		await new ResendRegistrationCode(input, repo).execute();

		expect(repo.resend).toHaveBeenCalledWith(input);
	});

	it.each([true, false])('GetRegistrationStatus reports enabled=%p', async (enabled) => {
		const repo: jest.Mocked<RegistrationStatusRepo> = {
			isSelfRegistrationEnabled: jest.fn().mockResolvedValue(enabled)
		};

		expect(await new GetRegistrationStatus(undefined, repo).execute()).toStrictEqual({enabled});
	});
});
