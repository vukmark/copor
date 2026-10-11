import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GetPhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/GetPhoneNumberDTO';

export interface GetUserContactInformationDTO {
	userId: string;
	email: string;
	username: string;
	roleName: string;
	roleType: RoleType;
	firstName?: string | null;
	lastName?: string | null;
	nickname?: string;
	salutation?: string | null;
	streetAddress?: string;
	city?: string;
	phones?: GetPhoneNumberDTO[];
	country?: string;
	state?: string;
	tenantName?: string;
}