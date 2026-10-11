import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogVerifyRegistration extends NoDataLogger {
	getType(): string {
		return 'verifyRegistration';
	}
}
