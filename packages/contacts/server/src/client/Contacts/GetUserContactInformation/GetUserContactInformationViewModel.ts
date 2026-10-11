import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GetPhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/GetPhoneNumberDTO';

export interface GetUserContactInformationViewModel {
	userId: string;
	email: string;
	username: string;
	roleName: string;
	roleType: RoleType;
	firstName: string;
	lastName: string;
	nickname?: string;
	salutation?: string;
	streetAddress?: string;
	city?: string;
	phoneNumberList?: GetPhoneNumberDTO[];
	country?: string;
	state?: string;
}
