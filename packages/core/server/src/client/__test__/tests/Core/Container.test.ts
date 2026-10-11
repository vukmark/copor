import {Controller} from '../../../Interface/Controller';
import {ResponseFormat} from '../../../Interface/ResponseFormat';
import {ContainerInstance} from '../../../Core/ContainerInstance';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {Factory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {AppContext} from '../../../Interface/AppContext';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {Request, Response, NextFunction} from 'express';


class TestRepository {}
class TestLogger implements LogAction {
	log(): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
class TestFactoryMethod implements Factory<undefined> {
	run(): Promise<undefined> {
		return new Promise(() => {
			return;
		});
	}
}
class TestInteractor implements UseCase<undefined> {
	protected input: undefined;
	protected repository: undefined;

	execute(): Promise<undefined> {
		return new Promise(() => {
			return;
		});
	}
}
class TestValidator implements Validator {
	validate(): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
class TestController implements Controller {
	getResponse(): Promise<ResponseFormat<undefined>> {
		return Promise.resolve({
			status: 200,
			resBody: undefined
		});
	}
}

describe('test Container', () => {
	const mockedAppContext = {} as unknown as jest.Mocked<AppContext>;
	const container = new ContainerInstance(mockedAppContext);

	const createAndExpectEqual = <T>(creatorFn: () => T, expected: T) => {
		const received = creatorFn();

		expect(received).toStrictEqual(expected);
	};

	it('return repository', () => {
		createAndExpectEqual(() => container.getRepository(
			TestRepository
		), new TestRepository());
	});

	it('return logger', () => {
		createAndExpectEqual(() => container.getLogger(
			TestLogger,
			undefined,
			undefined,
			undefined
		), new TestLogger());
	});

	it('return interactor', () => {
		createAndExpectEqual(() => container.getInteractor(
			TestInteractor,
			undefined,
			undefined
		), new TestInteractor());
	});

	it('return validator', () => {
		createAndExpectEqual(() => container.getValidator(
			TestValidator,
			undefined,
			undefined,
			undefined
		), new TestValidator());
	});

	it('return factory method', () => {
		createAndExpectEqual(
			() => container.getFactory(
				TestFactoryMethod,
				new TestValidator(),
				new TestInteractor(),
				new TestLogger()
			),
			new TestFactoryMethod()
		);
	});

	it('return controller', () => {
		createAndExpectEqual(() => container.getController(
			TestController,
			container,
			undefined as unknown as Request,
			undefined as unknown as Response,
			undefined as unknown as NextFunction
		), new TestController());
	});
});
