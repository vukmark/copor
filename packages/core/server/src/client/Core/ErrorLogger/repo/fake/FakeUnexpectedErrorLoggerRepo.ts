import {UnexpectedErrorLoggerDTO, UnexpectedErrorLoggerRepo} from '@copor/core/domain/Core/Repository/UnexpectedErrorLoggerRepo';

export class FakeUnexpectedErrorLoggerRepo implements UnexpectedErrorLoggerRepo {
	log(input: UnexpectedErrorLoggerDTO): Promise<void> {
		return Promise.resolve();
	}
}