import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetWorkflowSystemSettings extends NoDataLogger {
	public getType(): string {
		return 'getWorkflowSystemSettings';
	}
}
