import {CreateAuthUser} from '@copor/core/domain/User/interactor/CreateAuthUser';
import {SaveAuthUserRepo} from '@copor/core/domain/User/repository/SaveAuthUserRepo';
import {SaveAuthUserDTO} from '@copor/core/domain/User/interactor/dto/SaveAuthUserDTO';

describe('create auth user interactor tests', () => {
	const mockRepo: jest.Mocked<SaveAuthUserRepo> = {
		save: jest.fn()
	};
	const input: SaveAuthUserDTO = {
		id: 'id',
		userName: 'un',
		password: 'pw',
		email: 'em'
	};

	it('should create auth user', async () => {
		const interactor: CreateAuthUser = new CreateAuthUser(input, mockRepo);

		await interactor.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});