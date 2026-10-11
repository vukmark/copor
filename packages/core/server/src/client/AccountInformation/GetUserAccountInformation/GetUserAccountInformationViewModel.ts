import {GetAddressDTO} from '@copor/core/domain/Components/Address/interactor/dto/GetAddressDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GetPhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/GetPhoneNumberDTO';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {Gender} from '@copor/core/domain/Core/enum/Gender';

export interface GetUserAccountInformationViewModel {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	address?: GetAddressDTO;
	citizenship?: string;
	email: string;
	salutation?: string;
	nickName?: string;
	gender?: Gender;
	picture?: string;
	roleType: RoleType;
	registrationDate?: string;
	lastVisitedDate?: string;
	dateOfBirth?: string;
	placeOfBirth?: string;
	phoneNumberList: GetPhoneNumberDTO[];
	contactNote?: string;
	nativeLanguage?: NameAndIdDTO;
	qualifications?: string;
	isActive?: boolean;
	deletionRequested: boolean;
}
