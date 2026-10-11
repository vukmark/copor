import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export interface GetRoleDTO {
	id: string;
	type: RoleType;
	name: string;
}