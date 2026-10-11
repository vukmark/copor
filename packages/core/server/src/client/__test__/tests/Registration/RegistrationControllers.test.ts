import {NextFunction, Request, Response} from 'express';
import {Container} from '@copor/core/client/Interface/Container';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {RegistrationDisabledException} from '@copor/core/domain/Registration/exception/RegistrationDisabledException';
import {ValidateRegister} from '@copor/core/domain/Registration/validations/ValidateRegister';
import {ValidateVerifyRegistration} from '@copor/core/domain/Registration/validations/ValidateVerifyRegistration';
import {ValidateResendRegistrationCode} from '@copor/core/domain/Registration/validations/ValidateResendRegistrationCode';
import {NoOpLogger} from '@copor/core/domain/Core/Logger/NoOpLogger';
import {RegisterController} from '@copor/core/client/Registration/RegisterController';
import {VerifyRegistrationController} from '@copor/core/client/Registration/VerifyRegistrationController';
import {ResendRegistrationCodeController} from '@copor/core/client/Registration/ResendRegistrationCodeController';
import {GetRegistrationStatusController} from '@copor/core/client/Registration/GetRegistrationStatusController';

jest.mock('@copor/core/client/Core/IdGenerator/IdGenerator', () => ({
	IdGenerator: jest.fn().mockImplementation(() => ({getNewId: jest.fn().mockResolvedValue('new-user-id')}))
}));

function setup(body: unknown, factoryResult: unknown = undefined) {
	const factory = {run: jest.fn().mockResolvedValue(factoryResult)};
	const repo = {getPendingUserId: jest.fn().mockResolvedValue('pending-user-id')};
	const interactor = {execute: jest.fn().mockResolvedValue({enabled: true})};
	const container = {
		appContext: {envVariables: {}},
		getActorId: jest.fn().mockReturnValue(''),
		getNewRepoPicker: jest.fn().mockReturnValue(repo),
		getInteractor: jest.fn().mockReturnValue(interactor),
		getLogger: jest.fn().mockReturnValue({log: jest.fn()}),
		getFactory: jest.fn().mockReturnValue(factory)
	} as unknown as jest.Mocked<Container>;
	const response = {
		status: jest.fn().mockReturnThis(),
		send: jest.fn().mockReturnThis(),
		end: jest.fn().mockReturnThis()
	} as unknown as jest.Mocked<Response>;
	const next = jest.fn() as jest.MockedFunction<NextFunction>;
	const request = {body} as Request;

	return {factory, repo, interactor, container, response, next, request};
}

describe('RegisterController', () => {
	const body = {
		firstName: ' Jane ',
		lastName: 'Doe',
		email: ' jane.doe@example.com ',
		userName: 'jane.doe',
		password: 'Str0ng!Secret'
	};

	it('creates the account with a fresh 6-digit code and answers 201 with the email', async () => {
		const t = setup(body);

		await new RegisterController(t.container, t.request, t.response, t.next).getResponse();

		const [, validator, , logger] = t.container.getFactory.mock.calls[0];
		const [, , input] = t.container.getInteractor.mock.calls[0] as [unknown, unknown, Record<string, unknown>];

		expect(validator).toBeInstanceOf(ValidateRegister);
		expect(logger).toBeDefined();
		expect(input).toMatchObject({userId: 'new-user-id', email: 'jane.doe@example.com', userName: 'jane.doe'});
		expect(input.verificationCode).toMatch(/^\d{6}$/);
		expect((input.codeExpiresAt as Date).getTime()).toBeGreaterThan(Date.now());
		expect(t.response.status).toHaveBeenCalledWith(201);
		expect(t.response.send).toHaveBeenCalledWith({email: 'jane.doe@example.com'});
	});

	it('passes validation errors to the error middleware', async () => {
		const errors = new ErrorList([new RegistrationDisabledException()]);
		const t = setup(body, errors);

		await new RegisterController(t.container, t.request, t.response, t.next).getResponse();

		expect(t.next).toHaveBeenCalledWith(errors);
		expect(t.response.status).not.toHaveBeenCalled();
	});
});

describe('VerifyRegistrationController', () => {
	it('activates by email and logs the pending user as actor', async () => {
		const t = setup({email: 'jane.doe@example.com', code: ' 123456 '});

		await new VerifyRegistrationController(t.container, t.request, t.response, t.next).getResponse();

		expect(t.container.getFactory.mock.calls[0][1]).toBeInstanceOf(ValidateVerifyRegistration);
		expect(t.container.getInteractor.mock.calls[0][2]).toBe('jane.doe@example.com');
		expect(t.repo.getPendingUserId).toHaveBeenCalledWith('jane.doe@example.com');
		expect(t.response.status).toHaveBeenCalledWith(200);
	});

	it('passes a wrong code on as an error', async () => {
		const errors = new ErrorList([new Error('InvalidCodeException')]);
		const t = setup({email: 'jane.doe@example.com', code: '000000'}, errors);

		await new VerifyRegistrationController(t.container, t.request, t.response, t.next).getResponse();

		expect(t.next).toHaveBeenCalledWith(errors);
	});
});

describe('ResendRegistrationCodeController', () => {
	it('issues a new code without writing an audit entry', async () => {
		const t = setup({email: 'jane.doe@example.com'});

		await new ResendRegistrationCodeController(t.container, t.request, t.response, t.next).getResponse();

		const [, validator, , logger] = t.container.getFactory.mock.calls[0];

		expect(validator).toBeInstanceOf(ValidateResendRegistrationCode);
		expect(logger).toBeInstanceOf(NoOpLogger);
		expect(t.container.getInteractor.mock.calls[0][2]).toMatchObject({email: 'jane.doe@example.com'});
		expect(t.response.status).toHaveBeenCalledWith(200);
	});
});

describe('GetRegistrationStatusController', () => {
	it('returns whether self-registration is enabled', async () => {
		const t = setup(undefined);

		await new GetRegistrationStatusController(t.container, t.request, t.response, t.next).getResponse();

		expect(t.response.send).toHaveBeenCalledWith({enabled: true});
	});
});
