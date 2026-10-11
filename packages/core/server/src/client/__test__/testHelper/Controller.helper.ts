import {ControllerConstructor} from '../../Core/ContainerInstance';
import {Factory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {containerMock, nextFunctionMock, responseMock} from './Mocks';
import {Container} from '../../Interface/Container';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {NextFunction, Request, Response} from 'express';
import {Presenter} from '../../Interface/Presenter';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';

/*
eslint-disable jest/no-export,@typescript-eslint/await-thenable
*/
export function testController<Input, Params, Output>(controllerToTest: ControllerConstructor, requestBody: Input, requestParams: Params) {
	const mockedRequest = {
		body: requestBody,
		params: requestParams
	} as unknown as jest.Mocked<Request>;
	const mockedResponse = responseMock as unknown as jest.Mocked<Response>;
	const mockedNextFunction: jest.Mocked<NextFunction> = nextFunctionMock;

	const mockedContainer: jest.Mocked<Container> = containerMock;
	const mockedFactory: jest.Mocked<Factory<Output>> = {
		run: jest.fn()
	};
	const mockedValidator: jest.Mocked<Validator> = {
		validate: jest.fn()
	};
	const mockedPresenter: jest.Mocked<Presenter<Output>> = {
		present: jest.fn(() => {
			return {id: 'test'} as Output;
		})
	};
	const mockedUniqueIdGenerator: jest.Mocked<UniqueIdGenerator> = {
		getNewId: jest.fn().mockReturnValue('123')
	};

	describe('Resolves', () => {
		const controller = new controllerToTest(mockedContainer, mockedRequest, mockedResponse, mockedNextFunction);

		beforeEach(() => {
			mockedFactory.run.mockResolvedValue({id: 'test'} as Output);
			mockedContainer.getRepository.mockReturnValue(mockedUniqueIdGenerator);
			mockedContainer.getFactory.mockReturnValue(mockedFactory);
			mockedContainer.getValidator.mockReturnValue(mockedValidator);
			mockedContainer.getPresenter.mockReturnValue(mockedPresenter);
			controller.getResponse();
		});


		it('instantiates repository pickers', () => {
			expect(mockedContainer.getNewRepoPicker).toHaveBeenCalled();
		});

		it('instantiates validator', () => {
			expect(mockedContainer.getValidator).toHaveBeenCalled();
		});

		it('instantiates interactor', () => {
			expect(mockedContainer.getInteractor).toHaveBeenCalled();
		});

		it('instantiates logger', () => {
			expect(mockedContainer.getLogger).toHaveBeenCalled();
		});

		it('instantiates factory method', () => {
			expect(mockedContainer.getFactory).toHaveBeenCalled();
			expect(mockedFactory.run).toHaveBeenCalled();
		});

		it('run factory method', () => {
			expect(mockedFactory.run).toHaveBeenCalled();
		});

		it('responds with correct body and status', () => {
			controller.getResponse();
			expect(mockedResponse.status).toHaveBeenCalled();
			expect(mockedResponse.send).toHaveBeenCalled();
		});
	});
	describe('Rejects', () => {
		const controller = new controllerToTest(mockedContainer, mockedRequest, mockedResponse, mockedNextFunction);
		const errorList = new ErrorList([new Error('Test'), new Error('Test')]);

		beforeEach(() => {
			mockedFactory.run.mockResolvedValue(errorList);
			mockedContainer.getFactory.mockReturnValue(mockedFactory);
			mockedContainer.getValidator.mockReturnValue(mockedValidator);
			controller.getResponse();
		});
		it('calls next middleware for errorList', () => {
			expect(mockedNextFunction).toHaveBeenCalledWith(errorList);
		});
	});
}
