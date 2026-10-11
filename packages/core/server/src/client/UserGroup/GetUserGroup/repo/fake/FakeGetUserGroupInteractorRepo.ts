import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupDTO';

export class FakeGetUserGroupInteractorRepo implements GetItem<GetUserGroupDTO> {
	load(id: string): Promise<GetUserGroupDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: 'id',
					name: 'name',
					isSpecial: false
				}
			);
		});
	}
}