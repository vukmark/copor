import {TypedLogger} from '../../Core/Logger/Logger';

export class LogSetTenantLogo extends TypedLogger<LogDataForSetTenantLogo> {
	public getType(): string {
		return 'setTenantLogo';
	}
}

export interface LogDataForSetTenantLogo {
	tenantLogoId: string;
	url: string;
	alt?: string;
}