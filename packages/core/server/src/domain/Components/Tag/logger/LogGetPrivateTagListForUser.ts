import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetPrivateTagListForUser extends NoDataLogger {
	getType(): string {
		return 'getPrivateTagListForUser';
	}
}
