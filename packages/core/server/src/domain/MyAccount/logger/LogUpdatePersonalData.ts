import {Gender} from '../../Core/enum/Gender';
import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdatePersonalData extends TypedLogger<LogDataForUpdatePersonalData> {
	public getType(): string {
		return 'updatePersonalData';
	}
}

export interface LogDataForUpdatePersonalData {
	id: string;
	firstName: string;
	lastName: string;
	password: string;
	userRole: string;
	salutation?: string;
	nickName?: string;
	dateOfBirth?: string;
	placeOfBirth: string;
	gender: Gender;
	picture?: string;
	address?: string;
	postalCode?: string;
	city?: string;
	state?: string;
	country?: string;
	citizenship?: string;
	nativeLanguage: string;
	timeZone2FA?: string;
	email?: string;
	phoneHome?: string;
	phoneMobile?: string;
	noteForContacts?: string;
}