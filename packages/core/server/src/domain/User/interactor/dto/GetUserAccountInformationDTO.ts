import {GetAddressDTO} from '@copor/core/domain/Components/Address/interactor/dto/GetAddressDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GetPhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/GetPhoneNumberDTO';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {Gender} from '@copor/core/domain/Core/enum/Gender';

export interface GetUserAccountInformationDTO {
	id: string;
	firstName: string;
	lastName: string;
	userName: string;
	address?: GetAddressDTO;
	citizenship?: string;
	citizenshipId?: string;
	email: string;
	salutation?: string;
	nickname?: string;
	pictureName?: string;
	pictureExtension?: string;
	roleType: RoleType;
	registrationDate?: Date;
	lastVisitedDate?: Date;
	phoneNumberList: GetPhoneNumberDTO[];
	contactNote?: string;
	dateOfBirth?: Date;
	qualifications?: string;
	gender?: Gender;
	nativeLanguage?: NameAndIdDTO;
	placeOfBirth?: string;
	isActive?: boolean;
	deletionRequested: boolean;
}
