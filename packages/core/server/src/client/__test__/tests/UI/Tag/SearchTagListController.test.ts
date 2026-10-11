import {
	SearchTagListController,
	SearchTagListParams,
} from '../../../../Components/Tag/SearchTagList/SearchTagListController';
import {Container} from '../../../../Interface/Container';
import {containerMock, nextFunctionMock, responseMock} from '../../../testHelper/Mocks';
import {NextFunction, Request, Response} from 'express';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {Presenter} from '../../../../Interface/Presenter';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';
import {SearchTagListViewModel} from '../../../../Components/Tag/SearchTagList/SearchTagListViewModel';
import {SearchTag} from '@copor/core/domain/Components/Tag/interactor/SearchTag';
import {SearchTagRepo} from '@copor/core/domain/Components/Tag/repository/SearchTagRepo';
import {Color} from '@copor/core/domain/Core/enum/Color';

describe('test SearchTagList', () => {
	const searchTagListParams: SearchTagListParams = {
		prompt: 'paja'
	};
	const mockedContainer: jest.Mocked<Container> = containerMock;
	const mockedRequest = {
		body: undefined,
		params: searchTagListParams
	} as unknown as jest.Mocked<Request>;
	const mockedValidator: jest.Mocked<Validator> = {
		validate: jest.fn()
	};
	const mockedPresenter: jest.Mocked<Presenter<SearchTagListViewModel>> = {
		present: jest.fn(() => {
			return {
				id: 'test',
				name: 'name',
				color: Color.blue
			} as SearchTagListViewModel;
		})
	};
	const mockedUniqueIdGenerator: jest.Mocked<UniqueIdGenerator> = {
		getNewId: jest.fn().mockReturnValue('123')
	};
	const mockedResponse = responseMock as unknown as jest.Mocked<Response>;
	const mockedNextFunction: jest.Mocked<NextFunction> = nextFunctionMock;
	const controller = new SearchTagListController(mockedContainer, mockedRequest, mockedResponse, mockedNextFunction);
	const mockedRepo: jest.Mocked<SearchTagRepo> = {
		search: jest.fn()
	};
	const mockedInteractor = new SearchTag({search: searchTagListParams.prompt, actorId: 'actorId'}, mockedRepo);

	beforeEach(() => {
		mockedContainer.getRepository.mockReturnValue(mockedUniqueIdGenerator);
		mockedContainer.getInteractor.mockReturnValue(mockedInteractor);
		mockedContainer.getValidator.mockReturnValue(mockedValidator);
		mockedContainer.getPresenter.mockReturnValue(mockedPresenter);
	});
	it('instantiates repository pickers', async () => {
		await controller.getResponse();
		expect(mockedContainer.getNewRepoPicker).toHaveBeenCalled();
	});

	it('instantiates validator', async () => {
		await controller.getResponse();
		expect(mockedContainer.getValidator).toHaveBeenCalled();
	});

	it('instantiates interactor', async () => {
		await controller.getResponse();
		expect(mockedContainer.getInteractor).toHaveBeenCalled();
	});
	it('responds with correct body and status', async () => {
		await controller.getResponse();
		expect(mockedResponse.status).toHaveBeenCalled();
		expect(mockedResponse.send).toHaveBeenCalled();
	});
});
