import {GetAddressDTO} from '@copor/core/domain/Components/Address/interactor/dto/GetAddressDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export interface GetUserAccountInformationForDisplayViewModel {
	id: string;
	firstName: string;
	lastName: string;
	userName: string;
	registrationDate: string;
	lastVisitedDate?: string;
	address?: GetAddressDTO;
	citizenship?: string;
	email: string;
	salutation?: string;
	nickName?: string;
	picture?: string;
	roleType: RoleType;
}
