import {ValidateGetLogRepo} from '@copor/core/domain/Log/repository/ValidateGetLogRepo';

export class FakeGetLogValidatorStorageRepo implements ValidateGetLogRepo {
	isInvalidLog(logId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
