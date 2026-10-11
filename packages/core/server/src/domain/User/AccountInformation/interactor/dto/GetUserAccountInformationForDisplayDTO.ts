import {GetAddressDTO} from '@copor/core/domain/Components/Address/interactor/dto/GetAddressDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export interface GetUserAccountInformationForDisplayDTO {
	id: string;
	firstName: string;
	lastName: string;
	userName: string;
	registrationDate: Date;
	lastVisitedDate?: Date;
	address?: GetAddressDTO;
	citizenship?: string;
	email?: string;
	salutation?: string;
	nickname?: string;
	pictureName?: string;
	pictureExtension?: string;
	roleType: RoleType;
}
