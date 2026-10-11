import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export interface TranslatedRoleType {
	name: RoleType;
	translation: string;
}

export interface GetRoleViewModel {
	id: string;
	type: TranslatedRoleType;
	name: string;
}