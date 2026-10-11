import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export interface UpdateRoleReqBodyDTO {
	id: string;
	type: RoleType;
	name: string;
}