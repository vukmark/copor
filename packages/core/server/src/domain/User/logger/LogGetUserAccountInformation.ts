import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetUserAccountInformation extends NoDataLogger {
	getType(): string {
		return 'getUserAccountInformation';
	}
}
