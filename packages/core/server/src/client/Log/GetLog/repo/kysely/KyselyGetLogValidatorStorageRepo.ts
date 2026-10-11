import {ValidateGetLogRepo} from '@copor/core/domain/Log/repository/ValidateGetLogRepo';
import {LogKyselyHelper} from '@copor/core/client/Log/repositoryHelper/LogKyselyHelper';

export class KyselyGetLogValidatorStorageRepo implements ValidateGetLogRepo {
	isInvalidLog(logId: string | undefined): Promise<boolean> {
		return LogKyselyHelper.isInvalidLog(logId);
	}
}