import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetUserDTO} from '@copor/core/domain/User/interactor/dto/GetUserDTO';

export class FakeGetUserInteractorRepo implements GetItem<GetUserDTO> {
	load(id: string): Promise<GetUserDTO> {
		const user: GetUserDTO = {
			id: '12345',
			firstName: 'Max',
			lastName: 'Mustermann',
			userName: 'max.mustermann',
			imageName: '',
			email: 'sfdsd',
			role: 'user',
			isActive: true,
			isDefaultRole: true
		};

		return Promise.resolve(user);
	}
}
