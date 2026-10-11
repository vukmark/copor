import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetTenantActivationData extends TypedLogger<LogDataForGetTenantActivationData> {
	public getType(): string {
		return 'getBaseTenantActivationData';
	}
}

export interface LogDataForGetTenantActivationData {
	id: string;
	name: string;
	isBaseTenant: boolean;
	contractSigned: boolean;
	email: string;
}