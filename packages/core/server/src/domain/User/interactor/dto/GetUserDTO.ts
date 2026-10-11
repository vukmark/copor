import {GroupListDTO} from '@copor/core/domain/User/interactor/dto/GroupListDTO';

export interface GetUserDTO {
	id: string;
	firstName: string;
	lastName: string;
	userName: string;
	imageName?: string;
	imageExtension?: string;
	email: string;
	role: string;
	isDefaultRole: boolean;
	isActive: boolean;
	groupList?: GroupListDTO;
}
