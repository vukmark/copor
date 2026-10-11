import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogActivateTenant extends TypedLogger<LogDataForActivateTenant> {
	public getType(): string {
		return 'activateBaseTenant';
	}
}

export interface LogDataForActivateTenant {
	id: string;
	firstName: string;
	lastName: string;
}