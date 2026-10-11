import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForUpdateUserAccountInformation {
	id: string;
	firstName: string;
	lastName: string;
	address?: string;
	postalCode?: string;
	city?: string;
	country?: string;
	state?: string;
	citizenship?: string;
	email?: string;
	salutation?: string;
	nickName?: string;
	picture?: string;
	phoneHome?: string;
	phoneMobile?: string;
	phoneOffice?: string;
	phoneAlternative?: string;
}

export class LogUpdateUserAccountInformation
	extends TypedLogger<LogDataForUpdateUserAccountInformation> {
	getType(): string {
		return 'updateUserAccountInformation';
	}
}
