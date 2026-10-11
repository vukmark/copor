import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetContractTypeList extends NoDataLogger {
	getType(): string {
		return 'getContractTypeList';
	}
}
