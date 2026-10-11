import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetUserContactInformation
	extends TypedLogger<LogDataForGetUserContactInformation> {
	public getType(): string {
		return 'getUserContactInformation';
	}
}
export interface LogDataForGetUserContactInformation {
	userId: string;
}