import {RoleType} from '../../../../Core/enum/RoleType';

export interface SaveRoleDTO {
	id: string;
	type: RoleType;
	name: string;
	actorId: string;
}
