import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateAuthUserInformation extends TypedLogger<LogDataForUpdateAuthUserInformation> {
	public getType(): string {
		return 'updateAuthUserInformation';
	}
}

export interface LogDataForUpdateAuthUserInformation {
	id: string;
	userName: string;
	email?: string;
}
