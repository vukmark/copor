import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateUserLoginInformation extends TypedLogger<LogDataForUpdateUserLoginInformation> {
	public getType(): string {
		return 'updateUserLoginInformation';
	}
}

export interface LogDataForUpdateUserLoginInformation {
	userId: string;
	oldPassword: string;
}