import {TypedLogger} from '../../Core/Logger/Logger';

export class LogGetTenantLogo extends TypedLogger<LogDataForGetTenantLogo> {
	public getType(): string {
		return 'getTenantLogo';
	}
}

export interface LogDataForGetTenantLogo {
	tenantLogoId: string;
}