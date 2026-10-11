import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export interface ValidateCreateUserAccountInformationDTO {
	actorId: string;
	roleType: RoleType;
	email?: string;
}
