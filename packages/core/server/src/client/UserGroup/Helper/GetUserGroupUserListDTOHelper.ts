import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {GetUserGroupUserListDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupUserListDTO';

export class GetUserGroupUserListDTOHelper {
	public static toNameAndIdDTO(users: GetUserGroupUserListDTO[]): NameAndIdDTO[] {
		return users.map((user) => ({
			id: user.id,
			name: user.firstName + ' ' + user.lastName
		}));
	}
}