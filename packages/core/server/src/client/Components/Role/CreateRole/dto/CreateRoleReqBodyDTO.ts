import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export interface CreateRoleReqBodyDTO {
	type: RoleType;
	name: string;
}