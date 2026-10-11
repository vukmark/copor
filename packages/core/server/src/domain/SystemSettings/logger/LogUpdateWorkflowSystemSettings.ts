import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateWorkflowSystemSettings extends TypedLogger<LogDataForUpdateWorkflowSystemSettings> {
	public getType(): string {
		return 'updateWorkflowSystemSettings';
	}
}

export interface LogDataForUpdateWorkflowSystemSettings {
	enabled: boolean;
}
