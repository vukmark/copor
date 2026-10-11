import {Generated} from './Generated';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export interface Role {
	id: string;
	isDefaultForRoleType: boolean;
	name: string;
	type: RoleType;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
}
