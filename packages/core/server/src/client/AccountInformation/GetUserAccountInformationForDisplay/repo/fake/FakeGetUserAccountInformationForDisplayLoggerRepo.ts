import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';

export class FakeGetUserAccountInformationForDisplayLoggerRepo implements NoDataLogRepository {
	save(): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
