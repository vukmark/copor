import {SaveUserDTO} from '@copor/core/domain/User/interactor/dto/SaveUserDTO';
import {CreateUser} from '@copor/core/domain/User/interactor/CreateUser';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';

describe('Test Create User', () => {
	let interactor: CreateUser;
	let mockUserRepo: jest.Mocked<SaveItem<SaveUserDTO>>;
	let inputDTO: SaveUserDTO;

	beforeEach(() => {
		mockUserRepo = {
			save: jest.fn()
		};
		inputDTO = {
			id: 'id',
			authUser: 'authUser',
			role: 'role',
			isDefaultRole: true,
			isActive: true,
			actorId: 'actorId'
		};
		interactor = new CreateUser(inputDTO, mockUserRepo);
	});

	it('Should save NEW user', async () => {
		const result = await interactor.execute();

		expect(result).toEqual('id');
		expect(mockUserRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});
