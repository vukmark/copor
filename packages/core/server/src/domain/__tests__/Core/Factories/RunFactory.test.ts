import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';

describe('RunFactory', () => {
	it('runs validator, interactor and logger', async () => {
		const validator: jest.Mocked<Validator> = {
			validate: jest.fn().mockResolvedValue(null)
		};
		const creator: jest.Mocked<UseCase<string>> = {
			execute: jest.fn().mockResolvedValue('some response')
		};
		const logger: jest.Mocked<LogAction> = {
			log: jest.fn()
		};
		const factory = new RunFactory(validator, creator, logger);

		await factory.run();

		expect(validator.validate).toHaveBeenCalled();
		expect(creator.execute).toHaveBeenCalled();
		expect(logger.log).toHaveBeenCalled();
	});
});
