import {RoleType} from '../../../../Core/enum/RoleType';

export interface ValidateCreateRoleDTO {
	name: string;
	type: RoleType;
	actorId: string;
}