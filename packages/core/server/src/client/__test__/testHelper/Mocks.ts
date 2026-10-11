export const containerMock = {
	appContext: {
		authenticationMiddleware: {
			getActorId: jest.fn(),
			setupPrivateKey: jest.fn(),
			authenticate: jest.fn()
		},
		envVariables: {}
	},
	getValidator: jest.fn(),
	getRepository: jest.fn(),
	getInteractor: jest.fn(),
	getLogger: jest.fn(),
	getFactory: jest.fn(),
	getController: jest.fn(),
	getActorId: jest.fn(),
	getPresenter: jest.fn(),
	getRepoPicker: jest.fn(),
	getNewRepoPicker: jest.fn(),
	getSystemSettingsPresenter: jest.fn()
};

export const responseMock = {
	status: jest.fn(),
	send: jest.fn()
};

export const nextFunctionMock = jest.fn();
